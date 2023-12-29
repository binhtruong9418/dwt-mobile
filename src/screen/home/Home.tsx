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
import {useEffect, useState} from 'react';
import BusinessTabContainer from '../../components/home/tab-container/BusinessTabContainer.tsx';
import HomeTabContainer from '../../components/home/tab-container/HomeTabContainer.tsx';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import OfficeTabContainer from '../../components/home/tab-container/OfficeTabContainer.tsx';
import WorkStorage from '../work-storage/WorkStorage.tsx';
import ManufactureTabContainer from '../../components/home/tab-container/ManufactureTabContainer.tsx';

export default function Home({navigation}: any) {
  const {
    connection: {userInfo, currentTabManager},
    onSetCurrentTabManager,
  } = useConnection();
  const [currentMenuTab, setCurrentMenuTab] = useState(0);
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

  useRefreshOnFocus(() => {
    refetchAttendanceDay();
    refetchAttendanceData();
    refetchRewardAndPunish();
  });

  if (isLoadingAttendance || isLoadingReward || isLoadingAttendanceDay) {
    return <PrimaryLoading />;
  }

  return (
    userInfo && (
      <SafeAreaView style={styles.wrapper}>
        <HomeHeader navigation={navigation} />
        {(userInfo.role === 'admin' || userInfo.role === 'manager') && (
          <AdminTabBlock
            currentTab={currentTabManager}
            setCurrentTab={onSetCurrentTabManager}
            secondLabel={'Quản lý'}
          />
        )}
        {(userInfo.role === 'admin' || userInfo.role === 'manager') &&
          currentTabManager === 1 && (
            <TabBlock
              currentTab={currentMenuTab}
              setCurrentTab={setCurrentMenuTab}
            />
          )}
        {currentTabManager === 0 ? (
          <HomeTabContainer
            attendanceData={attendanceData}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            rewardAndPunishData={rewardAndPunishData}
          />
        ) : currentMenuTab === 0 && currentTabManager === 1 ? (
          <OfficeTabContainer
            attendanceData={attendanceData}
            rewardAndPunishData={rewardAndPunishData}
          />
        ) : currentMenuTab === 1 && currentTabManager === 1 ? (
          <BusinessTabContainer
            attendanceData={attendanceData}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            rewardAndPunishData={rewardAndPunishData}
          />
        ) : currentMenuTab === 2 && currentTabManager === 1 ? (
          <ManufactureTabContainer />
        ) : null}
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
