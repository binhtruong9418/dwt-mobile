import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {py20} from '../../../assets/style.ts';
import WorkProgressBlock from '../home-tab/WorkProgressBlock.tsx';
import SummaryBlock from '../home-tab/SummaryBlock.tsx';
import BehaviorBlock from '../home-tab/BehaviorBlock.tsx';
import WorkTable from '../WorkTable.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import PrimaryLoading from '../../common/loading/PrimaryLoading.tsx';
import AddIcon from '../../../assets/img/add.svg';
import PlusButtonModal from '../../work/PlusButtonModal.tsx';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function HomeTabContainer({
  attendanceData,
  checkInTime,
  checkOutTime,
  rewardAndPunishData,
}: any) {
  const navigation = useNavigation();
  const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);
  const [addButtonPosition, setAddButtonPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

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
  } = useQuery(['getListWorkOffice'], async () => {
    const resPersonal = await dwtApi.getOfficeWork();
    const listWorkPersonal = [
      ...resPersonal.data.kpi.targetDetails,
      ...resPersonal.data.kpi.reportTasks,
    ];
    const workSummary = {
      done: listWorkPersonal.filter((item: any) => item.work_status === 3)
        .length,
      working: listWorkPersonal.filter((item: any) => item.work_status === 2)
        .length,
      late: listWorkPersonal.filter((item: any) => item.work_status === 4)
        .length,
      total: listWorkPersonal.filter(
        (item: any) =>
          item.work_status === 4 ||
          item.work_status === 2 ||
          item.work_status === 3,
      ).length,
    };
    return {
      listWorkPersonal: listWorkPersonal,
      monthOverviewPersonal: {
        percent: resPersonal.data.kpi.percentFinish,
        tasks: resPersonal.data.kpi.monthOverview.map((item: any) => {
          return {
            name: item.name,
            kpi: item.kpiValue ? item.kpiValue : 0,
          };
        }),
      },
      monthOverviewDepartment: {
        percent: resPersonal.data.departmentKpi.percentFinish,
        tasks: resPersonal.data.departmentKpi.monthOverview.map((item: any) => {
          return {
            name: item.name,
            kpi: item.kpiValue ? item.kpiValue : 0,
          };
        }),
      },
      workSummary,
      userKpi: Number(resPersonal.data.kpi.totalTmpKpi.replace(',', '.')),
      departmentKpi: Number(
        resPersonal.data.departmentKpi.totalTmpKpi.replace(',', '.'),
      ),
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

        <TouchableOpacity
          onLayout={({nativeEvent}) => {
            setAddButtonPosition({
              x: nativeEvent.layout.x,
              y: nativeEvent.layout.y,
              width: nativeEvent.layout.width,
              height: nativeEvent.layout.height,
            });
          }}
          style={styles.align_end}
          onPress={() => setIsOpenPlusButton(true)}>
          <AddIcon width={32} height={32} />
          <PlusButtonModal
            visible={isOpenPlusButton}
            setVisible={setIsOpenPlusButton}
            position={addButtonPosition}
            navigation={navigation}
          />
        </TouchableOpacity>
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
  align_end: {
    alignSelf: 'flex-end',
    paddingRight: 15,
  },
});
