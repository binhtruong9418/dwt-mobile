import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useState} from 'react';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import {fs_14_400, text_black} from "../../assets/style.ts";
import DropdownIcon from "../../assets/img/dropdown-icon.svg";
import MonthPickerModal from "../../components/common/modal/MonthPickerModal.tsx";
import dayjs from "dayjs";
import PrimaryTable from "../../components/common/table/PrimaryTable.tsx";
import WorkStorageRowDetail from "../../components/work-storage/WorkStorageRowDetail.tsx";
import UserFilterMultipleModal from "../../components/common/modal/UserFilterMultipleModal.tsx";
import {WORK_STORAGE_STATUS} from "../../assets/constant.ts";
import WorkStorageStatusFilterModal from "../../components/common/modal/WorkStorageStatusFilterModal.tsx";
import ToastSuccessModal from "../../components/common/modal/ToastSuccessModal.tsx";

export default function WorkStorage({navigation}: any) {
    const {connection: {currentTabManager}} = useConnection();
    const [currentDate, setCurrentDate] = useState<{
        month: number;
        year: number;
        date: number;
    }>({
        month: dayjs().month(),
        year: dayjs().year(),
        date: dayjs().date(),
    });
    const [isOpenSelectMonth, setIsOpenSelectMonth] = useState(false);
    const [isOpenSelectUser, setIsOpenSelectUser] = useState(false);
    const [listCurrentUser, setListCurrentUser] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(WORK_STORAGE_STATUS[0]);
    const [isOpenSelectStatus, setIsOpenSelectStatus] = useState(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

    const columns = [
        {
            key: 'index',
            title: 'TT',
            width: 0.1,
        },
        {
            key: 'name',
            title: 'Tên',
            width: 0.5,
        },
        {
            key: 'kpi',
            title: 'KPI',
            width: 0.15,
        },
        {
            key: 'deadline',
            title: 'Thời hạn',
            width: 0.25,
        },
    ]
    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock
                secondLabel={'Quản lý'}
            />
            <Header title={'KHO VIỆC'} handleGoBack={() => navigation.goBack()}/>

            <View style={styles.filter_wrapper}>
                <TouchableOpacity
                    style={[currentTabManager === 1 ? styles.dropdownManager : styles.dropdown]}
                    onPress={() => {
                        setIsOpenSelectMonth(true);
                    }}
                >
                    <Text style={[text_black, fs_14_400]}>
                        Tháng {currentDate.month + 1}
                    </Text>
                    <DropdownIcon width={20} height={20}/>
                </TouchableOpacity>

                {
                    currentTabManager === 1 && (
                        <TouchableOpacity
                            style={[currentTabManager === 1 ? styles.dropdownManager : styles.dropdown]}
                            onPress={() => {
                                setIsOpenSelectStatus(true);
                            }}
                        >
                            <Text style={[text_black, fs_14_400]}>
                                {currentStatus.label}
                            </Text>
                            <DropdownIcon width={20} height={20}/>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    style={[currentTabManager === 1 ? styles.dropdownManager : styles.dropdown]}
                    onPress={() => {
                        setIsOpenSelectUser(true)
                    }}
                >
                    <Text style={[text_black, fs_14_400]}>Người giao</Text>
                    <DropdownIcon width={20} height={20}/>
                </TouchableOpacity>

            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <PrimaryTable
                    data={[
                        {
                            index: 1,
                            name: 'Làm việc với khách hàng',
                            kpi: '10',
                            deadline: '10/10/2021',
                            bgColor: '#FEF4A5'
                        },
                        {
                            index: 2,
                            name: 'Làm việc với khách hàng',
                            kpi: '10',
                            deadline: '10/10/2021',
                            bgColor: '#FEF4A5'
                        },
                        {
                            index: 2,
                            name: 'Làm việc với khách hàng',
                            kpi: '10',
                            deadline: '10/10/2021',
                            bgColor: '#FEF4A5'
                        },
                        {
                            index: 2,
                            name: 'Làm việc với khách hàng',
                            kpi: '10',
                            deadline: '10/10/2021',
                            bgColor: '#FEF4A5'
                        }
                    ]}
                    columns={columns}
                    canShowMore={true}
                    rowDetailComponent={(item: any) => {
                        return (
                            <WorkStorageRowDetail/>
                        )
                    }}
                />
            </ScrollView>
            <MonthPickerModal
                visible={isOpenSelectMonth}
                setVisible={() => {
                    setIsOpenSelectMonth(false);
                }}
                currentMonth={currentDate}
                setCurrentMonth={setCurrentDate}
            />
            <UserFilterMultipleModal
                visible={isOpenSelectUser}
                setVisible={setIsOpenSelectUser}
                listCurrentUser={listCurrentUser}
                setListCurrentUser={setListCurrentUser}
                listUser={[
                    {
                        value: '1',
                        label: 'Nguyễn Văn A'
                    },
                    {
                        value: '2',
                        label: 'Nguyễn Văn B'
                    },
                    {
                        value: '3',
                        label: 'Nguyễn Văn B'
                    },
                    {
                        value: '4',
                        label: 'Nguyễn Văn B'
                    }
                ]}
            />
            <WorkStorageStatusFilterModal
                visible={isOpenSelectStatus}
                setVisible={setIsOpenSelectStatus}
                setStatusValue={setCurrentStatus}
                statusValue={currentStatus}
            />
            <ToastSuccessModal
                visible={isOpenSuccessModal}
                handlePressOk={() => {
                    setIsOpenSuccessModal(false);
                }}
                description={'Nhận việc thành công'}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dropdownManager: {
        width: '32%',
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
    content: {
        gap: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20,
    },
    filter_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 10
    },
});
