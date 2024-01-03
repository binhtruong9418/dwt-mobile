import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import TabBlock from '../../components/work/TabBlock.tsx';
import {useMemo, useState} from 'react';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import AddIcon from '../../assets/img/add.svg';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import {fs_14_400, text_black} from '../../assets/style.ts';
import WorkStatusFilterModal from '../../components/common/modal/WorkStatusFilterModal.tsx';
import {
    LIST_WORK_STATUS_FILTER,
    WORK_STATUS_COLOR,
} from '../../assets/constant.ts';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import dayjs from 'dayjs';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';
import PlusButtonModal from '../../components/work/PlusButtonModal.tsx';
import MonthPickerModal from '../../components/common/modal/MonthPickerModal.tsx';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import ListDepartmentModal from '../../components/home/manager-tab/ListDepartmentModal.tsx';
import WorkRowDetail from '../../components/common/table/WorkRowDetail.tsx';
import {getMonthFormat} from "../../utils";

const columns = [
    {
        key: 'index',
        title: 'STT',
        width: 0.1,
    },
    {
        key: 'name',
        title: 'Tên',
        width: 0.3,
    },
    {
        key: 'unit_name',
        title: 'ĐVT',
        width: 0.15,
    },
    {
        key: 'totalTarget',
        title: 'Chỉ tiêu',
        width: 0.15,
    },
    {
        key: 'totalComplete',
        title: 'Lũy kế',
        width: 0.15,
    },
    {
        key: 'todayTotal',
        title: 'Hôm nay',
        width: 0.15,
    },
];
export default function Work({navigation}: any) {
    const {
        connection: {userInfo, currentTabManager},
    } = useConnection();
    const [statusValue, setStatusValue] = useState(LIST_WORK_STATUS_FILTER[0]);
    const [currentMonth, setCurrentMonth] = useState({
        month: dayjs().month(),
        year: dayjs().year(),
    });
    const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);
    const [isOpenStatusSelect, setIsOpenStatusSelect] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);
    const [isOpenSelectDepartment, setIsOpenSelectDepartment] = useState(false);

    const [currentDepartment, setCurrentDepartment] = useState<any>({
        value: 0,
        label: 'Phòng ban',
    });

    const {data: listDepartment = []} = useQuery(
        ['listDepartment'],
        async () => {
            const res = await dwtApi.getListDepartment();
            return res.data;
        },
        {
            enabled:
                !!userInfo &&
                (userInfo.role === 'admin' || userInfo.role === 'manager'),
        }
    );

    const {
        data: {listKeyWorkData, listNonKeyWorkData, listAriseWorkData} = {
            listKeyWorkData: [],
            listNonKeyWorkData: [],
            listAriseWorkData: [],
        },
        isLoading: isLoadingWorkPersonal,
        refetch: refetchWorkPersonal,
    } = useQuery(
        ['getListWorkPersonal', currentMonth],
        async ({queryKey}: any) => {
            const keyWorkRes = await dwtApi.getListWork({
                date: getMonthFormat(queryKey[1].month + 1, queryKey[1].year),
            });
            const arisWorkRes = await dwtApi.getListWorkArise({
                date: getMonthFormat(queryKey[1].month + 1, queryKey[1].year),
            });

            return {
                listKeyWorkData: keyWorkRes.data.kpi.keys,
                listNonKeyWorkData: keyWorkRes.data.kpi.noneKeys,
                listAriseWorkData: arisWorkRes.data.businessStandardWorkAriseAll,
            };
        },
        {
            enabled: currentTabManager === 0,
        }
    );

    const {
        data: {
            listKeyWorkDepartmentData,
            listNonKeyWorkDepartmentData,
            listAriseWorkDepartmentData,
        } = {
            listKeyWorkDepartmentData: [],
            listNonKeyWorkDepartmentData: [],
            listAriseWorkDepartmentData: [],
        },
        isLoading: isLoadingWorkDepartment,
        refetch: refetchWorkDepartment,
    } = useQuery(
        ['getListWorkDepartment', currentDepartment, currentMonth],
        async ({queryKey}) => {
            console.log('run department');
            const listWorkDepartmentData = await dwtApi.getListWorkDepartment({
                department_id:
                    currentDepartment.value === 0 ? undefined : currentDepartment.value,
                date: getMonthFormat(queryKey[2].month + 1, queryKey[2].year),
            });
            const listWorkAriseDepartmentData =
                await dwtApi.getListWorkAriseDepartment({
                    department_id:
                        currentDepartment.value === 0 ? undefined : currentDepartment.value,
                    date: getMonthFormat(queryKey[2].month + 1, queryKey[2].year),
                });

            const listKeyWorkDepartmentAll = Object.keys(
                listWorkDepartmentData.data.kpi.keyByUsers
            ).reduce((acc, val) => {
                return acc.concat(listWorkDepartmentData.data.kpi.keyByUsers[val]);
            }, []);

            const listNonKeyWorkDepartmentAll = Object.keys(
                listWorkDepartmentData.data.kpi.nonKeyByUsers
            ).reduce((acc, val) => {
                return acc.concat(listWorkDepartmentData.data.kpi.nonKeyByUsers[val]);
            }, []);

            return {
                listKeyWorkDepartmentData: listKeyWorkDepartmentAll,
                listNonKeyWorkDepartmentData: listNonKeyWorkDepartmentAll,
                listAriseWorkDepartmentData:
                listWorkAriseDepartmentData.data.businessStandardWorkAriseAll,
            };
        },
        {
            enabled:
                !!userInfo &&
                (userInfo.role === 'admin' || userInfo.role === 'manager') &&
                currentTabManager === 1,
        }
    );

    const tableData = useMemo(() => {
        switch (currentTab) {
            case 0:
                return (
                    currentTabManager === 1 ? listKeyWorkDepartmentData : listKeyWorkData
                )
                    .map((work: any, index: number) => {
                        const listLog = work.business_standard_report_logs || [];
                        let totalToday = 0;
                        if (listLog.length > 0) {
                            const listTodayLog = listLog.filter(
                                (log: any) => log.reported_date === dayjs().format('YYYY-MM-DD')
                            );
                            listTodayLog.forEach((log: any) => {
                                let temp = log.manager_quantity
                                    ? log.manager_quantity
                                    : log.quantity
                                        ? log.quantity
                                        : 0;
                                if (temp > totalToday) {
                                    totalToday = temp;
                                }
                            });
                        }
                        return {
                            ...work,
                            index: index + 1,
                            todayTotal: totalToday,
                            totalTarget:
                                work.business_standard_quantity_display.split('/')[1],
                            totalComplete: work.business_standard_result,
                            bgColor: work.actual_state
                                ? // @ts-ignore
                                WORK_STATUS_COLOR[work.actual_state]
                                : '#FFF',
                        };
                    })
                    .filter((work: any) => {
                        if (statusValue.value === '0') {
                            return true;
                        }
                        if (work?.actual_state) {
                            return (
                                work.actual_state.toString() ===
                                statusValue.value
                            );
                        }
                        return false;
                    });
            case 1:
                return (
                    currentTabManager === 1
                        ? listNonKeyWorkDepartmentData
                        : listNonKeyWorkData
                )
                    .map((work: any, index: number) => {
                        const listLog = work.business_standard_report_logs || [];
                        let totalToday = 0;
                        if (listLog.length > 0) {
                            const listTodayLog = listLog.filter(
                                (log: any) => log.reported_date === dayjs().format('YYYY-MM-DD')
                            );
                            listTodayLog.forEach((log: any) => {
                                let temp = log.manager_quantity
                                    ? log.manager_quantity
                                    : log.quantity
                                        ? log.quantity
                                        : 0;
                                if (temp > totalToday) {
                                    totalToday = temp;
                                }
                            });
                        }
                        return {
                            ...work,
                            index: index + 1,
                            todayTotal: totalToday,
                            totalTarget:
                                work.business_standard_quantity_display.split('/')[1],
                            totalComplete: work.business_standard_result,
                            bgColor: work.actual_state
                                ? // @ts-ignore
                                WORK_STATUS_COLOR[work.actual_state]
                                : '#FFF',
                        };
                    })
                    .filter((work: any) => {
                        if (statusValue.value === '0') {
                            return true;
                        }
                        if (work?.actual_state) {
                            return (
                                work.actual_state.toString() ===
                                statusValue.value
                            );
                        }
                        return false;
                    });
            case 2:
                return (
                    currentTabManager === 1
                        ? listAriseWorkDepartmentData
                        : listAriseWorkDepartmentData
                ).map((work: any, index: number) => {
                    const listLog = work.business_standard_arise_logs || [];
                    let totalAmountCompleted =
                        work.business_standard_quantity_display.split('/')[0];
                    let totalTarget =
                        work.business_standard_quantity_display.split('/')[1];

                    let totalToday = 0;
                    if (listLog.length > 0) {
                        const listTodayLog = listLog.filter(
                            (log: any) => log.reported_date === dayjs().format('YYYY-MM-DD')
                        );
                        listTodayLog.forEach((log: any) => {
                            let temp = log.manager_quantity
                                ? log.manager_quantity
                                : log.quantity
                                    ? log.quantity
                                    : 0;
                            if (temp > totalToday) {
                                totalToday = temp;
                            }
                        });
                    }
                    return {
                        ...work,
                        index: index + 1,
                        totalTarget: totalTarget,
                        totalComplete: totalAmountCompleted,
                        todayTotal: totalToday,
                        bgColor: work.actual_state
                            ? // @ts-ignore
                            WORK_STATUS_COLOR[work.actual_state]
                            : '#FFF',
                        isWorkArise: true,
                    };
                }).filter((work: any) => {
                    if (statusValue.value === '0') {
                        return true;
                    }
                    if (work?.actual_state) {
                        return (
                            work.actual_state.toString() ===
                            statusValue.value
                        );
                    }
                    return false;
                });
            default:
                return [];
        }
    }, [
        currentTab,
        statusValue,
        listKeyWorkData,
        listNonKeyWorkData,
        listAriseWorkData,
        listKeyWorkDepartmentData,
        listNonKeyWorkDepartmentData,
        listAriseWorkDepartmentData,
        currentTabManager,
    ]);

    useRefreshOnFocus(() => {
        refetchWorkPersonal();
        refetchWorkDepartment();
    });

    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock secondLabel={'Quản lý'}/>
            <Header
                title={'NHẬT TRÌNH CÔNG VIỆC'}
                handleGoBack={() => {
                    navigation.goBack();
                }}
            />
            <TabBlock currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.filter_wrapper}>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => {
                            setIsOpenStatusSelect(true);
                        }}
                    >
                        <Text style={[text_black, fs_14_400]}>{statusValue.label}</Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.dropdown]}
                        onPress={() => {
                            setIsOpenTimeSelect(true);
                        }}
                    >
                        <Text style={[text_black, fs_14_400]}>
                            {currentMonth.month + 1}/{currentMonth.year}
                        </Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>
                </View>

                {currentTabManager === 1 && (
                    <TouchableOpacity
                        style={[
                            styles.dropdown,
                            {
                                width: '100%',
                            },
                        ]}
                        onPress={() => {
                            setIsOpenSelectDepartment(true);
                        }}
                    >
                        <Text style={[text_black, fs_14_400, {width: '80%'}]}>
                            {currentDepartment.label}
                        </Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>
                )}
                <PrimaryTable
                    data={tableData}
                    columns={columns}
                    canShowMore={true}
                    rowDetailComponent={(item: any) => {
                        return (
                            <WorkRowDetail
                                data={item}
                                isWorkArise={currentTab === 2}
                                isDepartment={currentTabManager === 1}
                                date={getMonthFormat(currentMonth.month + 1, currentMonth.year)}
                            />
                        );
                    }}
                />
            </ScrollView>

            <TouchableOpacity
                style={styles.align_end}
                onPress={() => setIsOpenPlusButton(true)}
            >
                <AddIcon width={32} height={32}/>
                <PlusButtonModal
                    visible={isOpenPlusButton}
                    setVisible={setIsOpenPlusButton}
                    navigation={navigation}
                    hasGiveWork={currentTabManager === 1}
                />
            </TouchableOpacity>
            <WorkStatusFilterModal
                visible={isOpenStatusSelect}
                setVisible={setIsOpenStatusSelect}
                setStatusValue={setStatusValue}
                statusValue={statusValue}
            />
            <MonthPickerModal
                visible={isOpenTimeSelect}
                setVisible={setIsOpenTimeSelect}
                setCurrentMonth={setCurrentMonth}
                currentMonth={currentMonth}
            />

            {isOpenSelectDepartment && (
                <ListDepartmentModal
                    currentDepartment={currentDepartment}
                    setCurrentDepartment={setCurrentDepartment}
                    visible={isOpenSelectDepartment}
                    setVisible={setIsOpenSelectDepartment}
                    listDepartment={listDepartment.map((department: any) => {
                        return {
                            value: department.id,
                            label: department.name,
                        };
                    })}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        position: 'relative',
    },
    content: {
        gap: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20,
    },
    filter_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pl10: {
        paddingLeft: 10,
    },
    dropdownAdminDepartment: {
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    dropdown: {
        width: '47%',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    align_end: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        zIndex: 2,
    },
});
