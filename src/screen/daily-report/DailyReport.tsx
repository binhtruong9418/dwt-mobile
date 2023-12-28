import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import PrimaryDropdown from '../../components/common/dropdown/PrimaryDropdown.tsx';
import dayjs from 'dayjs';
import {useState} from 'react';
import DailyCalendar from '../../components/daily-report/DailyCalendar.tsx';
import EmptyDailyReportIcon from '../../assets/img/empty-daily-report.svg';
import {
  fs_12_400,
  fs_15_700,
  fs_16_700,
  text_black,
  text_center,
} from '../../assets/style.ts';
import MonthPickerModal from '../../components/common/modal/MonthPickerModal.tsx';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import PersonalReportDetail from '../../components/daily-report/PersonalReportDetail.tsx';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import PersonalReport from '../../components/daily-report/PersonalReport.tsx';
import DepartmentReport from '../../components/daily-report/DepartmentReport.tsx';

export default function DailyReport({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [currentWorkTab, setCurrentWorkTab] = useState(0);

  return (
    <SafeAreaView style={styles.wrapper}>
      {userInfo && userInfo.role === 'admin' && (
        <AdminTabBlock
          currentTab={currentWorkTab}
          setCurrentTab={setCurrentWorkTab}
        />
      )}
      <Header title={'Báo cáo ngày'} handleGoBack={() => navigation.goBack()} />
      {currentWorkTab === 0 ? <PersonalReport /> : <DepartmentReport />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
