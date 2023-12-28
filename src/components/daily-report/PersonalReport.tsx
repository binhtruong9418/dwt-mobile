import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fs_12_400,
  fs_15_700,
  text_black,
  text_center,
} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import DailyCalendar from './DailyCalendar.tsx';
import PersonalReportDetail from './PersonalReportDetail.tsx';
import PrimaryButton from '../common/button/PrimaryButton.tsx';
import MonthPickerModal from '../common/modal/MonthPickerModal.tsx';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {getDaysInMonth} from '../../utils';
import {dwtApi} from '../../api/service/dwtApi.ts';
import LoadingActivity from '../common/loading/LoadingActivity.tsx';
import EmptyDailyReportIcon from '../../assets/img/empty-daily-report.svg';
import CreateOrEditDailyReportModal from '../common/modal/CreateOrEditDailyReportModal.tsx';

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
  const today = dayjs();
  const [isLoading, setIsLoading] = useState(false);
  //only can create or edit if today is same day with currentDate
  const canCreateOrEdit =
    currentDate.month === today.month() &&
    currentDate.year === today.year() &&
    currentDate.date === today.date();
  const [listUserReports, setListUserReports] = useState<any[]>([]); //list report of current month
  const [isOpenCreateOrEditModal, setIsOpenCreateOrEditModal] = useState(false);
  const fetchUserReports = async () => {
    const daysInMoth = getDaysInMonth(currentDate.month, currentDate.year);
    const userReports = [];
    for (const day of daysInMoth) {
      setIsLoading(true);
      try {
        //convert to YYYY-MM-DD
        const reportDate = `${currentDate.year}-${currentDate.month + 1}-${
          day.date
        }`;
        console.log(reportDate);
        const userReport = await dwtApi.getPersonalDailyReport({
          date_report: reportDate,
        });
        userReports.push(userReport.data);
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    setListUserReports(userReports);
  };
  console.log('listUserReports', listUserReports);
  const todayReport = listUserReports.find(
    (item: any) =>
      item.date_report ===
      `${currentDate.year}-${currentDate.month + 1}-${currentDate.date}`,
  );

  useEffect(() => {
    // fetchUserReports();
    // setListUserReports([
    //   {
    //     created_at: '2023-12-28T17:57:09.000000Z',
    //     date_report: '2023-12-29',
    //     id: 1,
    //     today_work_note: '432432',
    //     user_id: 31,
    //     yesterday_work_note: 'hjdfsafds',
    //   },
    // ]);
    setListUserReports([]);
  }, [currentDate.month, currentDate.year]);
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
        listUserReports={listUserReports}
      />
      {todayReport ? (
        <ScrollView style={styles.listReport}>
          <Text style={styles.timeText}>9:30</Text>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{
              paddingTop: 30,
              paddingBottom: 20,
            }}
            data={
              todayReport
                ? [
                    {
                      key: 1,
                      text: todayReport?.today_work_note ?? '',
                      label: 'Hôm nay',
                      time: dayjs(todayReport?.created_at).format('HH:mm'),
                    },
                    {
                      key: 2,
                      text: todayReport?.yesterday_work_note ?? '',
                      label: 'Hôm qua',
                      time: dayjs(todayReport?.created_at).format('HH:mm'),
                    },
                  ]
                : []
            }
            renderItem={({item}) => {
              return (
                <View style={styles.boxContainer}>
                  <PersonalReportDetail data={item} />
                </View>
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
      {todayReport && canCreateOrEdit && (
        <PrimaryButton
          onPress={() => {
            setIsOpenCreateOrEditModal(true);
          }}
          text={'Sửa báo cáo'}
          buttonStyle={styles.buttonStyle}
        />
      )}

      {!todayReport && canCreateOrEdit && (
        <PrimaryButton
          onPress={() => {
            setIsOpenCreateOrEditModal(true);
          }}
          text={'Thêm báo cáo'}
          buttonStyle={styles.buttonStyle}
        />
      )}

      <MonthPickerModal
        visible={isOpenSelectMonth}
        setVisible={() => {
          setIsOpenSelectMonth(false);
        }}
        currentMonth={currentDate}
        setCurrentMonth={setCurrentDate}
      />
      <CreateOrEditDailyReportModal
        visible={isOpenCreateOrEditModal}
        setVisible={() => {
          setIsOpenCreateOrEditModal(false);
        }}
        isEdit={todayReport}
      />
      <LoadingActivity isLoading={isLoading} />
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
