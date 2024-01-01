import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useState} from 'react';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import PersonalReport from '../../components/daily-report/PersonalReport.tsx';
import DepartmentReport from '../../components/daily-report/DepartmentReport.tsx';
import {fs_15_700, text_black} from "../../assets/style.ts";
import DropdownIcon from "../../assets/img/dropdown-icon.svg";
import DailyCalendar from "../../components/daily-report/DailyCalendar.tsx";
import dayjs from "dayjs";
import MonthPickerModal from "../../components/common/modal/MonthPickerModal.tsx";
import DailyMeetingCalendar from "../../components/meeting/DailyMeetingCalendar.tsx";
import DropShadow from "react-native-drop-shadow";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import ChevronDownIcon from "../../assets/img/chevron-down.svg";
import MeetingItem from "../../components/meeting/MeetingItem.tsx";
import AddIcon from "../../assets/img/add.svg";
import PlusButtonModal from "../../components/work/PlusButtonModal.tsx";

export default function MeetingInfo({navigation}: any) {
    const {
        connection: {currentTabManager},
    } = useConnection();

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
    const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);

    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock
                secondLabel={'Quản lý'}
            />
            <Header title={'DANH SÁCH CUỘC HỌP'} handleGoBack={() => navigation.goBack()}/>
            <View style={styles.content}>
                <View style={styles.top}>
                    <TouchableOpacity
                        style={styles.monthBox}
                        onPress={() => {
                            setIsOpenSelectMonth(true);
                        }}>
                        <Text style={[fs_15_700, text_black]}>
                            Tháng {currentDate.month + 1}
                        </Text>
                        <DropdownIcon width={20} height={20}/>
                    </TouchableOpacity>
                    <DailyMeetingCalendar
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                    />
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={[1, 2]}
                    renderItem={({item}) => {
                        return (
                            <MeetingItem item={item}/>
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                />
            </View>

            <MonthPickerModal
                visible={isOpenSelectMonth}
                setVisible={() => {
                    setIsOpenSelectMonth(false);
                }}
                currentMonth={currentDate}
                setCurrentMonth={setCurrentDate}
            />

            <TouchableOpacity
                style={styles.align_end}
                onPress={() => setIsOpenPlusButton(true)}
            >
                <AddIcon width={32} height={32}/>
                <PlusButtonModal
                    visible={isOpenPlusButton}
                    setVisible={setIsOpenPlusButton}
                    navigation={navigation}
                    notHasReceiveWork={true}
                />
            </TouchableOpacity>
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
        paddingTop: 10,
    },
    monthBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-end',
        padding: 8,
        marginBottom: 5,
    },
    top: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    align_end: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        zIndex: 2,
    },
});
