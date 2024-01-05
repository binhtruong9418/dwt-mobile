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
  fs_12_700,
  fs_14_400,
  fs_14_700,
  fs_15_400,
  fs_15_700,
  text_black,
  text_center,
  text_red,
  text_white,
} from '../../../assets/style.ts';
import { useMemo, useState } from 'react';
import AddIcon from "../../../assets/img/add.svg";
import PlusButtonModal from "../../work/PlusButtonModal.tsx";
import { useConnection } from '../../../redux/connection';
import { useQuery } from '@tanstack/react-query';
import { dwtApi } from '../../../api/service/dwtApi.ts';
import dayjs from "dayjs";
import PrimaryLoading from "../../common/loading/PrimaryLoading.tsx";
import FactoryReportDetail from "../home-component/FactoryReportDetail.tsx";
import { useRefreshOnFocus } from '../../../hook/useRefeshOnFocus.ts';
import WorkProgressBlock from "../home-component/WorkProgressBlock.tsx";
import EmptyDailyReportIcon from '../../../assets/img/empty-daily-report.svg';
import BehaviorBlock from "../home-component/BehaviorBlock.tsx";

const summaryData = [
  {
    label: 'Tổng KPI tạm tính',
    value: '10',
    unit: ' KPI',
  },
  {
    label: 'Tổng tiền tạm tính',
    value: '4.000.000',
    unit: ' đ',
  },
  {
    label: 'Tổng số báo cáo',
    value: '4',
    unit: '/24',
  },
];
export default function UserFactory({
  attendanceData,
  checkInTime,
  checkOutTime,
  rewardAndPunishData,
  navigation,
}: any) {
  const {
    connection: { userInfo, currentTabManager },
  } = useConnection();
  const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);

  const {
    data: userFactoryData = [],
    isLoading: loadingListFactoryReport,
    refetch,
  } = useQuery(['userFactory'], async () => {
    const date = dayjs().format('YYYY-MM');
    const response = await dwtApi.getProductionPersonalDiaryByMonth({
      date: date,
    });
    return response.data;
  });

  useRefreshOnFocus(refetch);

  if (loadingListFactoryReport) {
    return <PrimaryLoading />;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View>
          <Text style={[fs_15_700, text_black, text_center]}>
            CÔNG VIỆC THÁNG
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <WorkProgressBlock
          attendanceData={attendanceData}
          checkIn={checkInTime}
          checkOut={checkOutTime}
          userKpi={0}
          departmentKpi={100}
        />
        <BehaviorBlock
          type={'factory'}
          rewardAndPunishData={rewardAndPunishData}
        />
        <FlatList
          data={userFactoryData}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return <FactoryReportDetail data={item} navigation={navigation} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          ListEmptyComponent={() => {
            return (
              <View>
                <EmptyDailyReportIcon
                  style={{ alignSelf: 'center', marginTop: 50 }}
                />
                <Text style={[fs_12_400, text_black, text_center]}>
                  Chưa có báo cáo.
                </Text>
              </View>
            );
          }}
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
          notHasReceiveWork={true}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#F6F6F6',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 20,
    gap: 20,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#DD0013',
    paddingVertical: 5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryBox: {
    backgroundColor: '#F3F4F4',
    borderRadius: 6,
    paddingHorizontal: 15,
    width: '100%',
    gap: 10,
    paddingVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  align_end: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    zIndex: 2,
  },
});
