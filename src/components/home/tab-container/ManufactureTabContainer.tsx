import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fs_10_500,
  fs_12_400,
  fs_15_700,
  text_black,
  text_center,
  text_white,
} from '../../../assets/style.ts';
import {useMemo, useState} from 'react';
import dayjs from 'dayjs';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import DropdownIcon from '../../../assets/img/dropdown-icon.svg';
import DailyCalendar from '../../daily-report/DailyCalendar.tsx';
import PersonalReportDetail from '../../daily-report/PersonalReportDetail.tsx';
import EmptyDailyReportIcon from '../../../assets/img/empty-daily-report.svg';
import PrimaryButton from '../../common/button/PrimaryButton.tsx';
import MonthPickerModal from '../../common/modal/MonthPickerModal.tsx';
import CreateOrEditDailyReportModal from '../../common/modal/CreateOrEditDailyReportModal.tsx';
import LoadingActivity from '../../common/loading/LoadingActivity.tsx';
import {useNavigation} from '@react-navigation/native';

export default function ManufactureTabContainer() {
  const navigation = useNavigation();
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
  const {data: productionDiaryData = {}, isLoading: loadingProductionDiary} =
    useQuery(
      [
        'dwtApi.getProductionDiaryPerMonth',
        currentDate.month,
        currentDate.year,
      ],
      ({queryKey}: any) =>
        dwtApi.getProductionDiaryPerMonth({
          date: `${queryKey[2]}-${queryKey[1] + 1}`,
        }),
    );
  // console.log('productionDiaryData', productionDiaryData);
  const {data: listProjectLogs = []} = productionDiaryData;
  const todayLogs = useMemo(() => {
    return listProjectLogs.filter(
      (item: any) =>
        item.logDate ===
        `${currentDate.year}-${currentDate.month + 1}-${currentDate.date}`,
    );
  }, [listProjectLogs, currentDate]);

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
        listProjectLogs={listProjectLogs}
      />
      {todayLogs.length > 0 ? (
        <ScrollView style={styles.listReport}>
          <Text style={styles.timeText}>9:30</Text>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{
              paddingTop: 30,
              paddingBottom: 20,
            }}
            data={todayLogs.map((item: any) => ({...item, key: item.id}))}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.boxContainer}
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate('ProjectWorkDetail', {
                      data: item.project_work_id,
                    });
                    console.log('item', item.project_work_id);
                  }}>
                  <View style={styles.logWrapper}>
                    <View
                      style={[styles.timeBox, {backgroundColor: '#7CB8FF'}]}>
                      <Text style={[fs_10_500, text_white, text_center]}>
                        {item?.user_name} ({item?.type === 1 ? 'GV' : 'TK'})
                      </Text>
                    </View>
                    <Text style={[fs_12_400, text_black]}>{item?.content}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
          />
        </ScrollView>
      ) : (
        <View>
          <EmptyDailyReportIcon style={{alignSelf: 'center', marginTop: 50}} />
          <Text style={[fs_12_400, text_black, text_center]}>
            Bạn chưa có báo cáo.
          </Text>
        </View>
      )}

      <MonthPickerModal
        visible={isOpenSelectMonth}
        setVisible={() => {
          setIsOpenSelectMonth(false);
        }}
        currentMonth={currentDate}
        setCurrentMonth={setCurrentDate}
      />
      <LoadingActivity isLoading={loadingProductionDiary} />
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
    width: '90%',
    alignSelf: 'center',
  },
  logWrapper: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 10,
  },
  timeBox: {
    position: 'absolute',
    left: 15,
    top: -8,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});
