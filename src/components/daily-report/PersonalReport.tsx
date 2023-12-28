import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fs_15_700, text_black} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import DailyCalendar from './DailyCalendar.tsx';
import PersonalReportDetail from './PersonalReportDetail.tsx';
import PrimaryButton from '../common/button/PrimaryButton.tsx';
import MonthPickerModal from '../common/modal/MonthPickerModal.tsx';
import {useState} from 'react';
import dayjs from 'dayjs';

export default function PersonalReport({}) {
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
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.monthBox}
        onPress={() => {
          setIsOpenSelectMonth(true);
        }}>
        <Text style={[fs_15_700, text_black]}>
          Tháng {currentDate.month + 1}
        </Text>
        <DropdownIcon width={20} height={20} />
      </TouchableOpacity>
      <DailyCalendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <ScrollView style={styles.listReport}>
        <Text style={styles.timeText}>9:30</Text>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: 20,
          }}
          data={new Array(5)}
          renderItem={({item}) => {
            return (
              <View style={styles.boxContainer}>
                <PersonalReportDetail />
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
        />
      </ScrollView>
      <PrimaryButton
        onPress={() => {}}
        text={'Sửa báo cáo'}
        buttonStyle={styles.buttonStyle}
      />
      {/*<View>*/}
      {/*  <EmptyDailyReportIcon style={{alignSelf: 'center', marginTop: 50}} />*/}
      {/*  <Text style={[fs_12_400, text_black, text_center]}>*/}
      {/*    Bạn chưa có báo cáo.*/}
      {/*  </Text>*/}
      {/*</View>*/}
      <MonthPickerModal
        visible={isOpenSelectMonth}
        setVisible={() => {
          setIsOpenSelectMonth(false);
        }}
        currentMonth={currentDate}
        setCurrentMonth={setCurrentDate}
      />
    </View>
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
    marginRight: 15,
    marginTop: 10,
  },
  buttonStyle: {
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  listReport: {
    position: 'relative',
    paddingHorizontal: 15,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    position: 'absolute',
    left: 0,
    top: 20,
  },
  boxContainer: {
    width: '85%',
    alignSelf: 'flex-end',
  },
});
