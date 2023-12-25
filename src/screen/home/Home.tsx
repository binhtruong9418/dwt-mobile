import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
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
import dayjs from 'dayjs';
import {WORK_STATUS_COLOR} from '../../assets/constant.ts';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';

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
    key: 'business_standard_quantity_display',
    title: 'Số lượng',
    width: 0.25,
  },
  {
    key: 'business_standard_score_tmp',
    title: 'NS/KPI',
    width: 0.25,
  },
];
export default function Home({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();

  const {
    data: {checkInTime, checkOutTime} = {},
    isLoading: isLoadingAttendanceDay,
    refetch: refetchAttendanceDay,
  } = useQuery(['getAttendanceByDate'], async () => {
    const currentDate = new Date();
    const dateDay = dayjs(currentDate).format('YYYY-MM-DD');
    try {
      const res = await dwtApi.getAttendanceByDate(userInfo.id, dateDay);
      if (res.status === 200) {
        return {
          checkInTime: res.data.checkIn,
          checkOutTime: res.data.checkOut,
        };
      }
    } catch {
      return {
        checkInTime: null,
        checkOutTime: null,
      };
    }
  });

  const {
    data: attendanceData,
    isLoading: isLoadingAttendance,
    refetch: refetchAttendanceData,
  } = useQuery(['getAttendanceInfo'], async () => {
    const res = await dwtApi.getAttendanceInfo();
    return res.data;
  });

  const {
    data: rewardAndPunishData,
    isLoading: isLoadingReward,
    refetch: refetchRewardAndPunish,
  } = useQuery(['getRewardAndPunish'], async () => {
    const response = await dwtApi.getRewardAndPunish();
    return response.data;
  });

  const {
    data: {
      listWork,
      monthOverviewPersonal,
      monthOverviewDepartment,
      workPersonalData,
      workDepartmentData,
      workSummary,
    } = {
      listWork: [],
      monthOverviewPersonal: {},
      monthOverviewDepartment: {},
      workPersonalData: {},
      workDepartmentData: {},
      workSummary: {},
    },
    isLoading: isLoadingWork,
    refetch: refetchWork,
  } = useQuery(['getWorkListAndPoint'], async () => {
    const res = await dwtApi.getWorkListAndPoint();
    const kpi = res.data.kpi;
    const listWork = [...kpi.keys, ...kpi.noneKeys, ...kpi.workArise];
    const workSummary = {
      done: listWork.filter((item: any) => item.actual_state === 4).length,
      working: listWork.filter((item: any) => item.actual_state === 2).length,
      late: listWork.filter((item: any) => item.actual_state === 5).length,
      total: listWork.filter(
        (item: any) =>
          item.actual_state === 4 ||
          item.actual_state === 2 ||
          item.actual_state === 5,
      ).length,
    };
    return {
      listWork: listWork,
      monthOverviewPersonal: kpi.monthOverview,
      workPersonalData: kpi,
      workDepartmentData: res.data.departmentKPI,
      monthOverviewDepartment: res.data.departmentKPI.monthOverview,
      workSummary,
    };
  });

  useRefreshOnFocus(() => {
    refetchAttendanceDay();
    refetchAttendanceData();
    refetchRewardAndPunish();
    refetchWork();
  });

  if (
    isLoadingAttendance ||
    isLoadingReward ||
    isLoadingWork ||
    isLoadingAttendanceDay
  ) {
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
          <WorkProgressBlock
            attendanceData={attendanceData}
            checkIn={checkInTime}
            checkOut={checkOutTime}
            workPersonalData={workPersonalData}
            workDepartmentData={workDepartmentData}
          />
          <SummaryBlock
            monthOverviewPersonal={monthOverviewPersonal}
            monthOverviewDepartment={monthOverviewDepartment}
          />
          <BehaviorBlock
            rewardAndPunishData={rewardAndPunishData}
            workSummary={workSummary}
          />
          <PrimaryTable
            columns={columns}
            data={listWork.map((item: any, index: number) => {
              return {
                ...item,
                index: index + 1,
                // @ts-ignore
                bgColor: WORK_STATUS_COLOR[item.actual_state],
              };
            })}
          />
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
