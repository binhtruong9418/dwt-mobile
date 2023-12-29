import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useConnection} from '../../redux/connection';
import dayjs from 'dayjs';
import {
  fs_12_500,
  fs_14_400,
  fs_14_700,
  fs_15_400,
  fs_15_700,
  mt10,
  row_between,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';
import CheckWorkBlock from '../../components/attendance/CheckWorkBlock.tsx';
import DateTimePicker from 'react-native-ui-datepicker';
import {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import ChevronLeftIcon from '../../assets/img/chevron-left-calendar.svg';
import ChevronRightIcon from '../../assets/img/chevron-right-calendar.svg';
import ToastSuccessModal from '../../components/common/modal/ToastSuccessModal.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';

export default function Attendance({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [isOpenCheckSuccessModal, setIsOpenCheckSuccessModal] = useState(false);
  const [checkInOutTime, setCheckInOutTime] = useState('--:--');
  const {
    data: checkInOutData = {},
    isLoading: isLoadingCheckInOut,
    refetch: refetchCheckInOut,
  } = useQuery(
    ['checkInOut', dayjs().format('YYYY-MM-DD')],
    async ({queryKey}) => {
      const response = await dwtApi.getCheckInOutByDate(
        userInfo.id,
        queryKey[1],
      );
      return response.data;
    },
    {
      enabled: !!userInfo && !!userInfo.id,
    },
  );

  const handleCheckIn = async () => {
    try {
      const currentTime = dayjs().format('HH:mm');
      const response = await dwtApi.checkInOut(currentTime);
      if (response.status === 200) {
        setCheckInOutTime(response.data.checkIn.substring(0, 5));
        setIsOpenCheckSuccessModal(true);
        await refetchCheckInOut();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckOut = async () => {
    try {
      const currentTime = dayjs().format('HH:mm');
      const response = await dwtApi.checkInOut(
        checkInOutData.checkIn.substring(0, 5),
        currentTime,
      );
      if (response.status === 200) {
        setCheckInOutTime(response.data.checkOut.substring(0, 5));
        setIsOpenCheckSuccessModal(true);
        await refetchCheckInOut();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingCheckInOut) {
    return <PrimaryLoading />;
  }

  return (
    userInfo && (
      <SafeAreaView style={styles.wrapper}>
        <Header title={'CHẤM CÔNG'} handleGoBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text style={[fs_15_400, text_red, text_center]}>
            Ngày {dayjs().format('DD/MM/YYYY')}
          </Text>
          <CheckWorkBlock
            checkIn={checkInOutData?.checkIn}
            checkOut={checkInOutData?.checkOut}
            handleCheckIn={handleCheckIn}
            handleCheckOut={handleCheckOut}
          />
          <View
            style={[
              row_between,
              mt10,
              {
                paddingBottom: 10,
                borderBottomColor: '#D9D9D9',
                borderBottomWidth: 1,
              },
            ]}>
            <Text style={[fs_15_700, text_black]}>BẢNG CHẤM CÔNG</Text>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 8,
                backgroundColor: '#FFF',
                borderColor: '#DD0013',
                borderWidth: 1,
              }}>
              <Text style={[fs_12_500, text_red]}>+ Đơn nghỉ</Text>
            </View>
          </View>

          <Calendar
            style={styles.calendarContainer}
            initialDate={dayjs().format('YYYY-MM-DD')}
            firstDay={1}
            markedDates={{
              '2023-12-29': {
                selected: true,
                selectedColor: 'rgba(0, 112, 255, 0.20)',
                selectedTextColor: '#000',
              },
            }}
            // onDayPress={day => handleChangeDay(day.dateString)}
            theme={{
              dayTextColor: '#000',
              todayTextColor: '#DC3545',
              textDayFontSize: 13,
              textDayFontWeight: '700',
            }}
            renderArrow={direction => {
              return direction === 'left' ? (
                <ChevronLeftIcon width={20} height={20} />
              ) : (
                <ChevronRightIcon width={20} height={20} />
              );
            }}
          />

          <View
            style={[
              row_between,
              mt10,
              {
                paddingBottom: 10,
                borderBottomColor: '#D9D9D9',
                borderBottomWidth: 1,
              },
            ]}>
            <Text style={[fs_15_700, text_black]}>THỐNG KÊ THÁNG</Text>
            <Text
              style={[
                fs_14_400,
                {
                  color: 'rgba(0, 112, 255, 0.71)',
                },
              ]}>
              {'Bảng công >'}
            </Text>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text style={[fs_15_400, text_black]}>Tổng công</Text>
              <Text style={[fs_15_400, text_black]}>3/24</Text>
            </View>
            <View style={styles.box}>
              <Text style={[fs_15_400, text_black]}>Nghỉ / Vắng</Text>
              <Text style={[fs_15_400, text_black]}>2</Text>
            </View>
          </View>
        </ScrollView>
        <ToastSuccessModal
          visible={isOpenCheckSuccessModal}
          handlePressOk={() => {
            setIsOpenCheckSuccessModal(false);
          }}
          description={`Chấm công thành công lúc ${checkInOutTime}`}
        />
      </SafeAreaView>
    )
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    gap: 10,
  },
  calendarContainer: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderColor: '#787878',
    borderWidth: 0.5,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: '47%',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
});
