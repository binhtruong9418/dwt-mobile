import {StyleSheet, Dimensions} from 'react-native';
import HomeHeader from '../../components/home/HomeHeader.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {useConnection} from '../../redux/connection';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import dayjs from 'dayjs';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';
import TabBlock from '../../components/home/TabBlock.tsx';
import {useState} from 'react';
import HomeTabContainer from '../../components/home/tab-container/HomeTabContainer.tsx';
import ManagerTabContainer from '../../components/home/tab-container/ManagerTabContainer.tsx';

export default function Home({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [currentTab, setCurrentTab] = useState(0);

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
    data: listWorkDepartment = [],
    isLoading: isLoadingWorkDepartment,
    refetch: refetchWorkDepartment,
  } = useQuery(
    ['getWorkListDepartment'],
    async () => {
      const listWorkDepartmentData = await dwtApi.getListWorkDepartment();
      const listWorkAriseDepartmentData =
        await dwtApi.getListWorkAriseDepartment();

      const listWorkDepartmentAll = Object.keys(
        listWorkDepartmentData.data.kpi.keyByUsers,
      ).reduce((acc, val) => {
        return acc.concat(listWorkDepartmentData.data.kpi.keyByUsers[val]);
      }, []);

      const listNonKeyWorkDepartmentAll = Object.keys(
        listWorkDepartmentData.data.kpi.nonKeyByUsers,
      ).reduce((acc, val) => {
        return acc.concat(listWorkDepartmentData.data.kpi.nonKeyByUsers[val]);
      }, []);

      const listWorkDepartment = [
        ...listWorkDepartmentAll,
        ...listNonKeyWorkDepartmentAll,
        ...listWorkAriseDepartmentData.data.businessStandardWorkAriseAll,
      ];
      return listWorkDepartment;
    },
    {
      enabled:
        !!userInfo &&
        !!(userInfo.role === 'admin' || userInfo.role === 'manager'),
    },
  );

  const {
    data: {
      listWorkPersonal,
      monthOverviewPersonal,
      monthOverviewDepartment,
      workPersonalData,
      workDepartmentData,
      workSummary,
    } = {
      listWorkPersonal: [],
      monthOverviewPersonal: {},
      monthOverviewDepartment: {},
      workPersonalData: {},
      workDepartmentData: {},
      workSummary: {},
    },
    isLoading: isLoadingWork,
    refetch: refetchWork,
  } = useQuery(['getWorkListAndPoint'], async () => {
    const resPersonal = await dwtApi.getWorkListAndPoint();
    const kpiPersonal = resPersonal.data.kpi;
    const listWorkPersonal = [
      ...kpiPersonal.keys,
      ...kpiPersonal.noneKeys,
      ...kpiPersonal.workArise,
    ];
    const workSummary = {
      done: listWorkPersonal.filter((item: any) => item.actual_state === 4)
        .length,
      working: listWorkPersonal.filter((item: any) => item.actual_state === 2)
        .length,
      late: listWorkPersonal.filter((item: any) => item.actual_state === 5)
        .length,
      total: listWorkPersonal.filter(
        (item: any) =>
          item.actual_state === 4 ||
          item.actual_state === 2 ||
          item.actual_state === 5,
      ).length,
    };
    return {
      listWorkPersonal: listWorkPersonal,
      monthOverviewPersonal: kpiPersonal.monthOverview,
      workPersonalData: kpiPersonal,
      workDepartmentData: resPersonal.data.departmentKPI,
      monthOverviewDepartment: resPersonal.data.departmentKPI.monthOverview,
      workSummary,
    };
  });

  useRefreshOnFocus(() => {
    refetchAttendanceDay();
    refetchAttendanceData();
    refetchRewardAndPunish();
    refetchWork();
    refetchWorkDepartment();
  });

  if (
    isLoadingAttendance ||
    isLoadingReward ||
    isLoadingWork ||
    isLoadingAttendanceDay ||
    isLoadingWorkDepartment
  ) {
    return <PrimaryLoading />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <HomeHeader navigation={navigation} />
      <TabBlock currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 0 ? (
        <HomeTabContainer
          attendanceData={attendanceData}
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          workPersonalData={workPersonalData}
          workDepartmentData={workDepartmentData}
          monthOverviewPersonal={monthOverviewPersonal}
          monthOverviewDepartment={monthOverviewDepartment}
          rewardAndPunishData={rewardAndPunishData}
          workSummary={workSummary}
          listWorkPersonal={listWorkPersonal}
        />
      ) : currentTab === 1 ? (
        <ManagerTabContainer
          attendanceData={attendanceData}
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          workPersonalData={workPersonalData}
          workDepartmentData={workDepartmentData}
          monthOverviewPersonal={monthOverviewPersonal}
          monthOverviewDepartment={monthOverviewDepartment}
          rewardAndPunishData={rewardAndPunishData}
          workSummary={workSummary}
          listWorkDepartment={listWorkDepartment}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
