import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useConnection} from '../../redux/connection';
import dayjs from 'dayjs';
import {useState} from 'react';
import {fs_14_400, text_black} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import DatePickerFromToModal from '../../components/common/modal/DatePickerFromToModal.tsx';

export default function AttendanceSummary({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [fromDate, setFromDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [toDate, setToDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [isSelectDate, setIsSelectDate] = useState(false);
  return (
    userInfo && (
      <SafeAreaView style={styles.wrapper}>
        <Header
          title={'TỔNG QUAN CHẤM CÔNG'}
          handleGoBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.dateSelectBox}
            onPress={() => {
              setIsSelectDate(true);
            }}>
            <Text style={[fs_14_400, text_black]}>
              {fromDate} - {toDate}
            </Text>
            <DropdownIcon />
          </TouchableOpacity>
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
    paddingVertical: 7,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    width: 210,
    alignSelf: 'flex-end',
  },
});
