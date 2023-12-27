import {ScrollView, StyleSheet, View} from 'react-native';
import {py20} from '../../../assets/style.ts';
import WorkProgressBlock from '../home-tab/WorkProgressBlock.tsx';
import SummaryBlock from '../home-tab/SummaryBlock.tsx';
import BehaviorBlock from '../home-tab/BehaviorBlock.tsx';
import WorkTable from '../WorkTable.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import PrimaryLoading from '../../common/loading/PrimaryLoading.tsx';

export default function BusinessTabContainer({
  attendanceData,
  checkInTime,
  checkOutTime,
  rewardAndPunishData,
}: any) {
  const {
    data: {
      listWorkPersonal,
      monthOverviewPersonal,
      monthOverviewDepartment,
      workSummary,
      userKpi,
      departmentKpi,
    } = {
      listWorkPersonal: [],
      monthOverviewPersonal: {},
      monthOverviewDepartment: {},
      workSummary: {},
      userKpi: 0,
      departmentKpi: 0,
    },
    isLoading: isLoadingWork,
  } = useQuery(['getListWorkBusiness'], async () => {
    const resPersonal = await dwtApi.getWorkListAndPoint();
    const listWorkPersonal = [
      ...resPersonal.data.kpi.keys,
      ...resPersonal.data.kpi.noneKeys,
      ...resPersonal.data.kpi.workArise,
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
      monthOverviewPersonal: {
        percent: resPersonal.data.kpi.monthOverview.percent,
        tasks: resPersonal.data.kpi.monthOverview.tasks.map((item: any) => {
          return {
            name: item.name,
            kpi: item.business_standard_score_tmp
              ? item.business_standard_score_tmp
              : 0,
          };
        }),
      },
      monthOverviewDepartment: {
        percent: resPersonal.data.departmentKPI.monthOverview.percent,
        tasks: resPersonal.data.departmentKPI.monthOverview.tasks.map(
          (item: any) => {
            return {
              name: item.name,
              kpi: item.business_standard_score_tmp
                ? item.business_standard_score_tmp
                : 0,
            };
          },
        ),
      },
      workSummary,
      userKpi: resPersonal.data.kpi.tmpTotalKPI,
      departmentKpi: resPersonal.data.departmentKPI.tmpTotalKPI,
    };
  });

  if (isLoadingWork) {
    return <PrimaryLoading />;
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={py20}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <WorkProgressBlock
          attendanceData={attendanceData}
          checkIn={checkInTime}
          checkOut={checkOutTime}
          userKpi={userKpi}
          departmentKpi={departmentKpi}
        />
        <SummaryBlock
          monthOverviewPersonal={monthOverviewPersonal}
          monthOverviewDepartment={monthOverviewDepartment}
        />
        <BehaviorBlock
          rewardAndPunishData={rewardAndPunishData}
          workSummary={workSummary}
        />
        <WorkTable listWork={listWorkPersonal} />
      </View>
    </ScrollView>
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
