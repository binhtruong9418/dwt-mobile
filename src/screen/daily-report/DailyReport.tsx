import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import PrimaryDropdown from '../../components/common/dropdown/PrimaryDropdown.tsx';
import dayjs from 'dayjs';
import {useState} from 'react';
import DailyCalendar from '../../components/daily-report/DailyCalendar.tsx';
import EmptyDailyReportIcon from '../../assets/img/empty-daily-report.svg';
import {
  fs_12_400,
  fs_16_700,
  text_black,
  text_center,
} from '../../assets/style.ts';
import MonthPickerModal from '../../components/common/modal/MonthPickerModal.tsx';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';

export default function DailyReport({navigation}: any) {
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header title={'Báo cáo ngày'} handleGoBack={() => navigation.goBack()} />
      <Pressable
        style={styles.monthBox}
        onPress={() => {
          setIsOpenSelectMonth(true);
        }}>
        <Text style={[fs_16_700, text_black]}>
          Tháng {currentDate.month + 1}
        </Text>
        <DropdownIcon width={20} height={20} />
      </Pressable>
      <DailyCalendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <View>
        <EmptyDailyReportIcon style={{alignSelf: 'center', marginTop: 50}} />
        <Text style={[fs_12_400, text_black, text_center]}>
          Bạn chưa có báo cáo.
        </Text>
      </View>
      <MonthPickerModal
        visible={isOpenSelectMonth}
        setVisible={() => {
          setIsOpenSelectMonth(false);
        }}
        currentMonth={currentDate}
        setCurrentMonth={setCurrentDate}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  monthBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 5,
  },
  dropdownStyle: {
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  footer: {
    flex: 0.1,
    paddingBottom: 10,
  },
});
