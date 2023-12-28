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
import WorkBusinessManagerTable from '../manager-tab/WorkBusinessManagerTable.tsx';
import {useConnection} from '../../../redux/connection';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import {useState} from 'react';
import ListDepartmentModal from '../manager-tab/ListDepartmentModal.tsx';
import PrimaryLoading from '../../common/loading/PrimaryLoading.tsx';
import WorkOfficeManagerTable from '../manager-tab/WorkOfficeManagerTable.tsx';
import dayjs from 'dayjs';
import MonthPickerModal from '../../common/modal/MonthPickerModal.tsx';
import AddIcon from '../../../assets/img/add.svg';
import PlusButtonModal from '../../work/PlusButtonModal.tsx';
import {useNavigation} from '@react-navigation/native';

export default function ManagerTabContainer({attendanceData}: any) {
  const {
    connection: {userInfo},
  } = useConnection();

  const navigation = useNavigation();
  const [isOpenDepartmentModal, setIsOpenDepartmentModal] =
    useState<boolean>(false);
  const [currentDepartment, setCurrentDepartment] = useState<any>({
    value: 0,
    label: 'Phòng ban',
  });
  const [currentMonth, setCurrentMonth] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);

  const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);
  const [addButtonPosition, setAddButtonPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
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
    {
      enabled:
        !!userInfo &&
        !!(userInfo.role === 'admin' || userInfo.role === 'manager'),
    },
  );

  const {
    data: listWorkBusiness = [],
    isLoading: isLoadingWorkDepartment,
    refetch: refetchWorkDepartment,
  } = useQuery(
    ['getListWorkBusinessManager'],
    async () => {
      const listWorkDepartmentData = await dwtApi.getListWorkDepartment({
        date: `${currentMonth.year}-${currentMonth.month + 1}`,
        department_id:
          currentDepartment.value === 0 ? currentDepartment.value : undefined,
      });
      const listWorkAriseDepartmentData =
        await dwtApi.getListWorkAriseDepartment({
          date: `${currentMonth.year}-${currentMonth.month + 1}`,
          department_id:
            currentDepartment.value === 0 ? currentDepartment.value : undefined,
        });

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

      const listWorkBusiness = [
        ...listWorkDepartmentAll,
        ...listNonKeyWorkDepartmentAll,
        ...listWorkAriseDepartmentData.data.businessStandardWorkAriseAll,
      ];
      return listWorkBusiness;
    },
    {
      enabled:
        !!userInfo &&
        !!(userInfo.role === 'admin' || userInfo.role === 'manager'),
    },
  );

  const {
    data: listWorkOffice = [],
    isLoading: isLoadingWorkOffice,
    refetch: refetchWorkOffice,
  } = useQuery(
    ['getListWorkOfficeManager'],
    async () => {
      const resPersonal = await dwtApi.getOfficeWork();
      return [
        ...resPersonal.data.departmentKpi.targetDetails,
        ...resPersonal.data.departmentKpi.reportTasks,
      ];
    },
    {
      enabled:
        !!userInfo &&
        !!(userInfo.role === 'admin' || userInfo.role === 'manager'),
    },
  );

  if (isLoadingWorkDepartment || isLoadingWorkOffice) {
    return <PrimaryLoading />;
  }

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
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setIsOpenTimeSelect(true);
                }}>
                <Text style={[text_black, fs_12_400]}>
                  Tháng {currentMonth.month + 1}/{currentMonth.year}
                </Text>
                <DropdownIcon width={20} height={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setIsOpenDepartmentModal(true);
                }}>
                <Text style={[text_black, fs_12_400]}>
                  {currentDepartment.name}
                </Text>
                <DropdownIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
            <WorkProgressBlock attendanceData={attendanceData} />
            <ReportAndProposeBlock
              totalDailyReport={dailyReportDepartmentData.countDailyReports}
            />
            {/*<TopUserBlock />*/}
            <WorkOfficeManagerTable listWork={listWorkOffice} />
            <WorkBusinessManagerTable listWork={listWorkBusiness} />

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

      <MonthPickerModal
        visible={isOpenTimeSelect}
        setVisible={setIsOpenTimeSelect}
        setCurrentMonth={setCurrentMonth}
        currentMonth={currentMonth}
      />
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
  align_end: {
    alignSelf: 'flex-end',
    paddingRight: 15,
  },
});
