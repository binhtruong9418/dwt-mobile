import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fs_12_400,
  fs_14_400,
  py20,
  text_black,
  text_center,
} from '../../../assets/style.ts';
import WorkProgressBlock from '../manager-tab/WorkProgressBlock.tsx';
import DropdownIcon from '../../../assets/img/dropdown-icon.svg';
import LockIcon from '../../../assets/img/lock-icon.svg';
import ReportAndProposeBlock from '../manager-tab/ReportAndProposeBlock.tsx';
import WorkDepartmentTable from '../manager-tab/WorkDepartmentTable.tsx';
import {useConnection} from '../../../redux/connection';
import TopUserBlock from '../manager-tab/TopUserBlock.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import {useState} from 'react';
import ListDepartmentModal from '../manager-tab/ListDepartmentModal.tsx';

export default function ManagerTabContainer({
  attendanceData,
  checkInTime,
  checkOutTime,
  workPersonalData,
  workDepartmentData,
  listWorkDepartment,
}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [isOpenDepartmentModal, setIsOpenDepartmentModal] =
    useState<boolean>(false);
  const [currentDepartment, setCurrentDepartment] = useState<any>({
    value: 0,
    label: 'Phòng ban',
  });

  const {data: listDepartment = []} = useQuery(['listDepartment'], async () => {
    const res = await dwtApi.getListDepartment();
    return res.data;
  });

  const {data: dailyReportDepartmentData = {}} = useQuery(
    ['listDailyReportDepartment'],
    async () => {
      const res = await dwtApi.getDailyReportDepartment();
      return res.data;
    },
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={py20}
        showsVerticalScrollIndicator={false}>
        {userInfo &&
        (userInfo.role === 'manager' || userInfo.role === 'admin') ? (
          <View style={styles.content}>
            <View style={styles.filter_wrapper}>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={[text_black, fs_12_400]}>Tháng 12/2023</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setIsOpenDepartmentModal(true);
                }}>
                <Text style={[text_black, fs_12_400]}>
                  {currentDepartment.label}
                </Text>
                <DropdownIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
            <WorkProgressBlock
              attendanceData={attendanceData}
              checkIn={checkInTime}
              checkOut={checkOutTime}
              workPersonalData={workPersonalData}
              workDepartmentData={workDepartmentData}
            />
            <ReportAndProposeBlock
              totalDailyReport={dailyReportDepartmentData.countDailyReports}
            />
            <TopUserBlock />
            <WorkDepartmentTable listWork={listWorkDepartment} />
          </View>
        ) : (
          <View
            style={{
              paddingTop: 50,
              alignItems: 'center',
            }}>
            <LockIcon width={100} height={100} />
            <Text
              style={[
                fs_14_400,
                text_center,
                text_black,
                {
                  marginTop: 20,
                },
              ]}>
              Tính năng này bạn không có quyền truy cập
            </Text>
          </View>
        )}
      </ScrollView>
      {isOpenDepartmentModal && (
        <ListDepartmentModal
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          visible={isOpenDepartmentModal}
          setVisible={setIsOpenDepartmentModal}
          listDepartment={listDepartment}
        />
      )}
    </View>
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
  filter_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    width: '47%',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
});
