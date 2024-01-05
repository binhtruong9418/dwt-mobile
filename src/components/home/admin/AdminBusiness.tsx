import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import BehaviorBlock from '../home-component/BehaviorBlock.tsx';
import WorkTable from '../WorkTable.tsx';
import { useQuery } from '@tanstack/react-query';
import { dwtApi } from '../../../api/service/dwtApi.ts';
import PrimaryLoading from '../../common/loading/PrimaryLoading.tsx';
import AddIcon from '../../../assets/img/add.svg';
import PlusButtonModal from '../../work/PlusButtonModal.tsx';
import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRefreshOnFocus } from '../../../hook/useRefeshOnFocus.ts';
import { useConnection } from '../../../redux/connection';
import dayjs from "dayjs";
import WorkProgressBlock from "../manager-component/WorkProgressBlock.tsx";
import ReportAndProposeBlock from "../manager-component/ReportAndProposeBlock.tsx";
import WorkBusinessManagerTable from "../manager-component/WorkBusinessManagerTable.tsx";

export default function AdminBusiness({
  attendanceData,
  rewardAndPunishData,
}: any) {
  const {
    connection: { userInfo },
  } = useConnection();
  const navigation = useNavigation();
  const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);

  const { data: totalReport = 0 } = useQuery(
    ['dailyReportHome'],
    async () => {
      const res = await dwtApi.getDailyReportDepartment({
        date_report: dayjs().format('YYYY-MM-DD'),
      });
      return res?.data?.countDailyReports;
    },
    {
      enabled: !!userInfo,
    }
  );

  const { data: totalMeeting = 0 } = useQuery(
    ['totalMeetingHome'],
    async () => {
      const res = await dwtApi.getListMeeting({
        date: dayjs().format('MM/YYYY'),
      });
      return res?.data?.total;
    },
    {
      enabled: !!userInfo,
    }
  );

  const { data: totalPropose = 0 } = useQuery(
    ['totalProposeHome'],
    async () => {
      const res = await dwtApi.getAllPropose({
        date: dayjs().format('YYYY-MM-DD'),
      });
      return res?.data?.total;
    }
  );

  const {
    data: listWorkDepartment = [],
    isLoading: isLoadingWork,
    refetch: refetchWork,
  } = useQuery(
    ['adminBusiness'],
    async () => {
      const listWorkDepartmentData = await dwtApi.getListWorkDepartment({
        date: dayjs().format('YYYY-MM'),
      });
      const listWorkAriseDepartmentData =
        await dwtApi.getListWorkAriseDepartment({
          date: dayjs().format('YYYY-MM'),
        });

      const listWorkDepartmentAll = Object.keys(
        listWorkDepartmentData.data.kpi.keyByUsers
      ).reduce((acc, val) => {
        return acc.concat(listWorkDepartmentData.data.kpi.keyByUsers[val]);
      }, []);

      const listNonKeyWorkDepartmentAll = Object.keys(
        listWorkDepartmentData.data.kpi.nonKeyByUsers
      ).reduce((acc, val) => {
        return acc.concat(listWorkDepartmentData.data.kpi.nonKeyByUsers[val]);
      }, []);

      return [
        ...listWorkDepartmentAll,
        ...listNonKeyWorkDepartmentAll,
        ...listWorkAriseDepartmentData.data.businessStandardWorkAriseAll.map(
          (item: any) => {
            return {
              ...item,
              isWorkArise: true,
            };
          }
        ),
      ];
    },
    {
      enabled: !!userInfo,
    }
  );

  const workSummary = useMemo(() => {
    if (listWorkDepartment) {
      return {
        done: listWorkDepartment.filter((item: any) => item.actual_state === 4)
          .length,
        working: listWorkDepartment.filter(
          (item: any) => item.actual_state === 2
        ).length,
        late: listWorkDepartment.filter((item: any) => item.actual_state === 5)
          .length,
        total: listWorkDepartment.filter(
          (item: any) =>
            item.actual_state === 4 ||
            item.actual_state === 2 ||
            item.actual_state === 5
        ).length,
      };
    } else {
      return {};
    }
  }, [listWorkDepartment]);

  useRefreshOnFocus(refetchWork);

  if (isLoadingWork) {
    return <PrimaryLoading />;
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WorkProgressBlock
          attendanceData={attendanceData}
          totalMeeting={totalMeeting}
        />
        <ReportAndProposeBlock
          totalDailyReport={totalReport}
          totalPropose={totalPropose}
        />

        <BehaviorBlock
          rewardAndPunishData={rewardAndPunishData}
          workSummary={workSummary}
          type={'business'}
        />
        <WorkBusinessManagerTable
          listWork={listWorkDepartment}
          date={dayjs().format('YYYY-MM')}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.align_end}
        onPress={() => setIsOpenPlusButton(true)}
      >
        <AddIcon width={32} height={32} />
        <PlusButtonModal
          visible={isOpenPlusButton}
          setVisible={setIsOpenPlusButton}
          navigation={navigation}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  content: {
    gap: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
  align_end: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    zIndex: 2,
  },
});
