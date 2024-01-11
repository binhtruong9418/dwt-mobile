import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import AdminTabBlock from "../../components/common/tab/AdminTabBlock.tsx";
import {fs_14_400, text_black} from "../../assets/style.ts";
import DropdownIcon from "../../assets/img/dropdown-icon.svg";
import dayjs from "dayjs";
import PrimaryTable from "../../components/common/table/PrimaryTable.tsx";
import AddIcon from "../../assets/img/add.svg";
import {useConnection} from "../../redux/connection";
import {useState} from "react";
import DatePickerModal from "../../components/common/modal/DatePickerModal.tsx";
import FilterRewardAndPunishStatusModal from "../../components/reward-and-punish/FilterRewardAndPunishStatusModal.tsx";
import FilterRewardAndPunishTypeModal from "../../components/reward-and-punish/FilterRewardAndPunishTypeModal.tsx";
import {LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR} from "../../assets/constant.ts";


const columns = [
    {
        title: 'Người liên quan',
        key: 'name',
        width: 5 / 15,
    },
    {
        title: 'Nội dung',
        key: 'content',
        width: 4 / 15,
    },
    {
        title: 'Loại',
        key: 'type',
        width: 2 / 15,
    },
    {
        title: 'SL',
        key: 'amount',
        width: 2 / 15,
    },
    {
        title: 'Đơn vị',
        key: 'unit',
        width: 2 / 15,
    },
]

const tableData = [
    {
        name: 'Nguyễn Văn A',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[1],
    },
    {
        name: 'Nguyễn Văn B',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[3],
    },
    {
        name: 'Nguyễn Văn C',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[3],
    },
    {
        name: 'Nguyễn Văn D',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[2],
    },
    {
        name: 'Nguyễn Văn E',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[2],
    },
    {
        name: 'Nguyễn Văn F',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[1],
    },
    {
        name: 'Nguyễn Văn G',
        content: 'Đi trễ',
        type: 'Khen thưởng',
        amount: 1,
        unit: 'KPI',
        bgColor: LIST_REWARD_AND_PUNISHMENT_STATUS_COLOR[2],
    },
]

export default function RewardAndPunishInfo({navigation}: any) {
    const {connection: {currentTabManager}} = useConnection();
    const [isOpenStatusSelect, setIsOpenStatusSelect] = useState(false);
    const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);
    const [statusValue, setStatusValue] = useState({
        label: 'Tất cả trạng thái',
        value: 0,
    });
    const [timeValue, setTimeValue] = useState(dayjs());
    const [isOpenTypeSelect, setIsOpenTypeSelect] = useState(false);
    const [typeValue, setTypeValue] = useState({
        label: 'Loại',
        value: 0,
    });
    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock/>
            <Header
                title={'KHEN THƯỞNG & XỬ PHẠT'}
                handleGoBack={() => navigation.goBack()}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                <View style={styles.filter_wrapper}>
                    <TouchableOpacity
                        style={[styles.dropdown, {
                            width: '38%',
                        }]}
                        onPress={() => {
                            setIsOpenStatusSelect(true);
                        }}>
                        <Text style={[text_black, fs_14_400]}>{statusValue.label}</Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.dropdown, {
                            width: '25%',
                        }]}
                        onPress={() => {
                            setIsOpenTypeSelect(true);
                        }}>
                        <Text style={[text_black, fs_14_400]}>{typeValue.label}</Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.dropdown, {
                            width: '33%',
                        }]}
                        onPress={() => {
                            setIsOpenTimeSelect(true);
                        }}>
                        <Text style={[text_black, fs_14_400]}>
                            {dayjs(timeValue).format('DD/MM/YYYY')}
                        </Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <PrimaryTable
                        data={tableData}
                        columns={columns}
                    />
                </View>
            </ScrollView>

            <FilterRewardAndPunishTypeModal
                visible={isOpenTypeSelect}
                setVisible={setIsOpenTypeSelect}
                setStatusValue={setTypeValue}
                statusValue={typeValue}
            />

            <FilterRewardAndPunishStatusModal
                visible={isOpenStatusSelect}
                setVisible={setIsOpenStatusSelect}
                setStatusValue={setStatusValue}
                statusValue={statusValue}
            />
            <DatePickerModal
                visible={isOpenTimeSelect}
                setVisible={setIsOpenTimeSelect}
                currentDate={timeValue}
                setCurrentDate={setTimeValue}
            />
            {
                currentTabManager === 1 && (

                    <TouchableOpacity
                        style={styles.align_end}
                        onPress={() => {
                            navigation.navigate('AddRewardAndPunish');
                        }}>
                        <AddIcon width={32} height={32}/>
                    </TouchableOpacity>
                )
            }
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    content: {
        gap: 20,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    filter_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdown: {
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    align_end: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
});
