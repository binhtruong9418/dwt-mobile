import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from '../../components/home/HomeHeader.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from '../../assets/img/banner.svg';
import WorkProgressBlock from '../../components/home/WorkProgressBlock.tsx';
import SummaryBlock from '../../components/home/SummaryBlock.tsx';
import {py20} from '../../assets/style.ts';
import BehaviorBlock from '../../components/home/BehaviorBlock.tsx';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import {useQuery} from '@tanstack/react-query';
import {useConnection} from '../../redux/connection';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';

const {width: windowWidth} = Dimensions.get('window');

const columns = [
  {
    key: 'index',
    title: 'STT',
    width: 0.1,
  },
  {
    key: 'name',
    title: 'Tên',
    width: 0.4,
  },
  {
    key: 'amount',
    title: 'Số lượng',
    width: 0.25,
  },
  {
    key: 'kpi',
    title: 'NS/KPI',
    width: 0.25,
  },
];
const tableData = [
  {
    index: 1,
    name: 'Báo cáo',
    amount: '3/10',
    kpi: '2',
    bgColor: '#FFB822',
  },

  {
    index: 2,
    name: 'Đào tạo',
    amount: '3/2',
    kpi: '6',
    bgColor: '#03D87F',
  },

  {
    index: 3,
    name: 'Bảo dưỡng xe',
    amount: '3/2',
    kpi: '2',
    bgColor: '#89B6FA',
  },

  {
    index: 4,
    name: 'Bảo dưỡng xe',
    amount: '3/10',
    kpi: '2',
    bgColor: '#FFF',
  },
  {
    index: 5,
    name: 'Báo cáo',
    amount: '3/10',
    kpi: '2',
    bgColor: '#F5325C',
  },

  {
    index: 6,
    name: 'Đào tạo',
    amount: '3/2',
    kpi: '6',
    bgColor: '#03D87F',
  },
];
export default function Home({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();

  const {data: attendanceData, isLoading: isLoadingAttendance} = useQuery(
    ['getAttendanceInfo'],
    async () => {
      const res = await dwtApi.getAttendanceInfo();
      return res.data;
    },
    {
      enabled: !!userInfo,
    },
  );

  const {data: rewardAndPunishData} = useQuery(
    ['getRewardAndPunish'],
    async () => {
      const response = await dwtApi.getRewardAndPunish();
      return response.data;
    },
    {enabled: !!userInfo},
  );

  if (isLoadingAttendance) {
    return <PrimaryLoading />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <HomeHeader navigation={navigation} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={py20}
        showsVerticalScrollIndicator={false}>
        <Banner
          width={windowWidth}
          height={(windowWidth / 16) * 9}
          style={[styles.banner]}
        />
        <View style={styles.content}>
          <WorkProgressBlock attendanceData={attendanceData} />
          <SummaryBlock />
          <BehaviorBlock rewardAndPunishData={rewardAndPunishData} />
          <PrimaryTable columns={columns} data={tableData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    position: 'relative',
  },
  content: {
    gap: 12,
    paddingHorizontal: 10,
  },
});
