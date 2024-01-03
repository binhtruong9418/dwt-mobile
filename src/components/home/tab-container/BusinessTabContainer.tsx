import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {fs_12_400, py20, text_black} from '../../../assets/style.ts';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import PrimaryLoading from '../../common/loading/PrimaryLoading.tsx';
import AddIcon from '../../../assets/img/add.svg';
import PlusButtonModal from '../../work/PlusButtonModal.tsx';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ReportAndProposeBlock from '../manager-tab/ReportAndProposeBlock.tsx';
import WorkProgressBlock from '../manager-tab/WorkProgressBlock.tsx';
import BehaviorBlock from '../home-tab/BehaviorBlock.tsx';
import DropdownIcon from '../../../assets/img/dropdown-icon.svg';
import dayjs from 'dayjs';
import WorkBusinessManagerTable from '../manager-tab/WorkBusinessManagerTable.tsx';
import ListDepartmentModal from '../manager-tab/ListDepartmentModal.tsx';
import MonthPickerModal from '../../common/modal/MonthPickerModal.tsx';
import {SafeAreaView} from "react-native-safe-area-context";
import {useRefreshOnFocus} from '../../../hook/useRefeshOnFocus.ts';
import {getMonthFormat} from "../../../utils";

export default function BusinessTabContainer({
                                                 attendanceData,
                                                 rewardAndPunishData,
                                             }: any) {
    const navigation = useNavigation();
    const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);

    const [isOpenDepartmentModal, setIsOpenDepartmentModal] =
        useState<boolean>(false);
    const [currentDepartment, setCurrentDepartment] = useState<any>({
        value: 0,
        label: 'Phòng ban',
    });
    const [currentMonth, setCurrentMonth] = useState({
        month: dayjs().month(),
        year: dayjs().year(),
    });
    const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);

    const {data: listDepartment = []} = useQuery(
        ['listDepartment'],
        async () => {
            const res = await dwtApi.getListDepartment();
            return res.data;
        }
    );

    const {
        data: {listWorkBusiness, workSummary} = {
            workSummary: {
                done: 0,
                working: 0,
                late: 0,
                total: 0,
            },
            listWorkBusiness: [],
        },
        isLoading: isLoadingWork,
        refetch: refetchWork,
    } = useQuery(
        ['getListWorkBusinessManager', currentDepartment, currentMonth],
        async ({queryKey}) => {
            const listWorkDepartmentData = await dwtApi.getListWorkDepartment({
                department_id: queryKey[1].value === 0 ? undefined : queryKey[1].value,
                date: getMonthFormat(queryKey[2].month + 1, queryKey[2].year),
            });
            const listWorkAriseDepartmentData =
                await dwtApi.getListWorkAriseDepartment({
                    department_id:
                        queryKey[1].value === 0 ? undefined : queryKey[1].value,
                    date: getMonthFormat(queryKey[2].month + 1, queryKey[2].year),
                });

            const listWorkDepartmentAll = Object.keys(
                listWorkDepartmentData.data.kpi.keyByUsers
            ).reduce((acc, val) => {
                return acc.concat(listWorkDepartmentData.data.kpi.keyByUsers[val]);
            }, []);

            const listNonKeyWorkDepartmentAll = Object.keys(
                listWorkDepartmentData.data.kpi.nonKeyByUsers
            ).reduce((acc, val) => {
                return acc.concat(listWorkDepartmentData.data.kpi.nonKeyByUsers[val]);
            }, []);

            const listWorkDepartment = [
                ...listWorkDepartmentAll,
                ...listNonKeyWorkDepartmentAll,
                ...listWorkAriseDepartmentData.data.businessStandardWorkAriseAll.map(
                    (item: any) => {
                        return {
                            ...item,
                            isWorkArise: true,
                        };
                    }
                ),
            ];
            const workSummary = {
                done: listWorkDepartment.filter((item: any) => item.actual_state === 3)
                    .length,
                working: listWorkDepartment.filter(
                    (item: any) => item.actual_state === 2
                ).length,
                late: listWorkDepartment.filter((item: any) => item.actual_state === 5)
                    .length,
                total: listWorkDepartment.filter(
                    (item: any) =>
                        item.actual_state === 4 ||
                        item.actual_state === 2 ||
                        item.actual_state === 5
                ).length,
            };
            return {
                workSummary,
                listWorkBusiness: listWorkDepartment,
            };
        }
    );

    useRefreshOnFocus(refetchWork);

    if (isLoadingWork) {
        return <PrimaryLoading/>;
    }
    return (
        <View style={styles.wrapper}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.filter_wrapper}>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => {
                            setIsOpenTimeSelect(true);
                        }}
                    >
                        <Text style={[text_black, fs_12_400]}>
                            Tháng {currentMonth.month + 1}/{currentMonth.year}
                        </Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => {
                            setIsOpenDepartmentModal(true);
                        }}
                    >
                        <Text style={[text_black, fs_12_400]}>
                            {currentDepartment.label}
                        </Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>
                </View>
                <WorkProgressBlock attendanceData={attendanceData}/>

                <ReportAndProposeBlock totalDailyReport={9}/>

                <BehaviorBlock
                    rewardAndPunishData={rewardAndPunishData}
                    workSummary={workSummary}
                />
                <WorkBusinessManagerTable
                    listWork={listWorkBusiness}
                    date={getMonthFormat(currentMonth.month + 1, currentMonth.year)}
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
                    hasGiveWork={true}
                />
            </TouchableOpacity>

            {isOpenDepartmentModal && (
                <ListDepartmentModal
                    currentDepartment={currentDepartment}
                    setCurrentDepartment={setCurrentDepartment}
                    visible={isOpenDepartmentModal}
                    setVisible={setIsOpenDepartmentModal}
                    listDepartment={listDepartment.map((department: any) => {
                        return {
                            value: department.id,
                            label: department.name,
                        };
                    })}
                />
            )}

            <MonthPickerModal
                visible={isOpenTimeSelect}
                setVisible={setIsOpenTimeSelect}
                setCurrentMonth={setCurrentMonth}
                currentMonth={currentMonth}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    content: {
        gap: 15,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    align_end: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        zIndex: 2,
    },
    filter_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
});
