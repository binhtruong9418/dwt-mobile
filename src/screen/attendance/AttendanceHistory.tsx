import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useConnection} from '../../redux/connection';
import dayjs from 'dayjs';
import {useState} from 'react';
import {fs_14_400, text_black} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import DatePickerFromToModal from '../../components/common/modal/DatePickerFromToModal.tsx';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';

export default function AttendanceHistory({route, navigation}: any) {
  const {departmentId} = route.params;
  const {
    connection: {userInfo},
  } = useConnection();
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [isSelectDate, setIsSelectDate] = useState(false);

  const {data: listAttendanceHistory = []} = useQuery(
    ['listAttendanceHistoryDepartment', fromDate, toDate],
    async () => {
      const res = await dwtApi.getAttendanceHistoryDepartment({
        datetime:
          fromDate.format('DD/MM/YYYY') + ' - ' + toDate.format('DD/MM/YYYY'),
        department: departmentId,
      });
      return res.data.data;
    },
    {
      enabled: !!userInfo && !!departmentId,
    },
  );

  const columns = [
    {
      key: 'name',
      title: 'Nhân viên',
      width: 0.35,
    },
    {
      key: 'date',
      title: 'Thời gian',
      width: 0.25,
    },
    {
      key: 'checkIn',
      title: 'Giờ vào',
      width: 0.2,
    },
    {
      key: 'checkOut',
      title: 'Giờ ra',
      width: 0.2,
    },
  ];
  return (
    userInfo && (
      <SafeAreaView style={styles.wrapper}>
        <Header
          title={'LỊCH SỬ CHẤM CÔNG'}
          handleGoBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.dateSelectBox}
            onPress={() => {
              setIsSelectDate(true);
            }}>
            <Text style={[fs_14_400, text_black]}>
              {fromDate.format('DD/MM/YYYY')} - {toDate.format('DD/MM/YYYY')}
            </Text>
            <DropdownIcon />
          </TouchableOpacity>
          <PrimaryTable
            data={listAttendanceHistory.map((item: any) => {
              return {
                ...item,
                name: item.users.name,
                date: dayjs()
                  .month(item.month)
                  .date(item.day)
                  .year(item.year)
                  .format('DD/MM/YYYY'),
                checkIn: item.checkIn,
                checkOut: item.checkOut,
              };
            })}
            columns={columns}
            headerColor={'#DCE1E7'}
          />
        </View>
        {isSelectDate && (
          <DatePickerFromToModal
            fromDate={fromDate}
            toDate={toDate}
            setVisible={setIsSelectDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        )}
      </SafeAreaView>
    )
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 15,
  },
  dateSelectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    width: 220,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
});
