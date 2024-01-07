import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useMemo, useState} from 'react';
import AdminTabBlock from '../../components/common/tab/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import {fs_12_500, fs_15_700, text_black, text_gray} from "../../assets/style.ts";
import DropdownIcon from "../../assets/img/dropdown-icon.svg";
import dayjs from "dayjs";
import MonthPickerModal from "../../components/common/modal/MonthPickerModal.tsx";
import DailyMeetingCalendar from "../../components/meeting/DailyMeetingCalendar.tsx";
import MeetingItem from "../../components/meeting/MeetingItem.tsx";
import AddIcon from "../../assets/img/add.svg";
import PlusButtonModal from "../../components/work/PlusButtonModal.tsx";
import {useQuery} from "@tanstack/react-query";
import {dwtApi} from "../../api/service/dwtApi.ts";
import PrimaryLoading from "../../components/common/loading/PrimaryLoading.tsx";

export default function MeetingInfo({navigation}: any) {
    const {
        connection: {currentTabManager, userInfo},
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

    const {
        data: listMeetingData = [],
        isLoading: isLoadingListMeeting,
    } = useQuery(['listMeeting', currentDate.month, currentDate.year, currentTabManager], async ({queryKey}) => {

        if(queryKey[3] === 1) {
                const res = await dwtApi.getListMeeting({
                    date: dayjs().month(Number(queryKey[1])).year(Number(queryKey[2])).format('MM/YYYY'),
                });
                if(userInfo?.role === 'manager') {
                    const listChildrenDepartment = await dwtApi.getListChildrenDepartment(userInfo?.departement_id);
                    return res?.data?.filter((item: any) => {
                        return listChildrenDepartment?.data?.includes(item?.departement_id);
                    });
                }
                return res?.data;
        } else {
            const res = await dwtApi.getListMeetingPersonal({
                date: dayjs().month(Number(queryKey[1])).year(Number(queryKey[2])).format('MM/YYYY'),
            });
            return res?.data;
        }
    })

    const listMeetingToday = useMemo(() => {
        return listMeetingData.filter((item: any) => {
            return dayjs(item?.start_time.split(' ')[0]).date() === currentDate.date;
        })

    }, [listMeetingData, currentDate, currentTabManager])

    if (isLoadingListMeeting) {
        return <PrimaryLoading/>
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock />
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
                        listMeeting={listMeetingData}
                    />
                </View>

                {
                    userInfo?.role === 'admin' || userInfo?.role === 'manager' && (
                        <View style={styles.totalReportBox}>
                            <Text style={[fs_12_500, text_gray]}>
                                {listMeetingData.length} cuộc họp
                            </Text>
                        </View>
                    )
                }
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    data={listMeetingToday}
                    contentContainerStyle={{
                        paddingBottom: 20,
                        paddingTop: 10,
                    }}
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
        flex: 1,
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
    },
    align_end: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        zIndex: 2,
    },
    totalReportBox: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
