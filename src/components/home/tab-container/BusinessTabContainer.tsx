import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fs_12_400, py20, text_black} from '../../../assets/style.ts';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../../api/service/dwtApi.ts';
import PrimaryLoading from '../../common/loading/PrimaryLoading.tsx';
import AddIcon from '../../../assets/img/add.svg';
import PlusButtonModal from '../../work/PlusButtonModal.tsx';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ReportAndProposeBlock from '../manager-tab/ReportAndProposeBlock.tsx';
import WorkProgressBlock from '../manager-tab/WorkProgressBlock.tsx';
import BehaviorBlock from '../home-tab/BehaviorBlock.tsx';
import DropdownIcon from '../../../assets/img/dropdown-icon.svg';
import dayjs from 'dayjs';
import WorkBusinessManagerTable from '../manager-tab/WorkBusinessManagerTable.tsx';
import ListDepartmentModal from '../manager-tab/ListDepartmentModal.tsx';
import MonthPickerModal from '../../common/modal/MonthPickerModal.tsx';

export default function BusinessTabContainer({
  attendanceData,
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

  const {data: listDepartment = []} = useQuery(['listDepartment'], async () => {
    const res = await dwtApi.getListDepartment();
    return res.data;
  });

  const {
    data: {listWorkBusiness, workSummary} = {
      workSummary: {
        done: 0,
        working: 0,
        late: 0,
        total: 0,
      },
      listWorkBusiness: [],
    },
    isLoading: isLoadingWork,
  } = useQuery(['getListWorkBusinessManager'], async () => {
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
    const workSummary = {
      done: listWorkDepartment.filter((item: any) => item.actual_state === 3)
        .length,
      working: listWorkDepartment.filter((item: any) => item.actual_state === 2)
        .length,
      late: listWorkDepartment.filter((item: any) => item.actual_state === 5)
        .length,
      total: listWorkDepartment.filter(
        (item: any) =>
          item.actual_state === 4 ||
          item.actual_state === 2 ||
          item.actual_state === 5,
      ).length,
    };
    return {
      workSummary,
      listWorkBusiness: listWorkDepartment,
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
              {currentDepartment.label}
            </Text>
            <DropdownIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <WorkProgressBlock attendanceData={attendanceData} />

        <ReportAndProposeBlock totalDailyReport={9} />

        <BehaviorBlock
          rewardAndPunishData={rewardAndPunishData}
          workSummary={workSummary}
        />
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
            hasReceiveWork={true}
          />
        </TouchableOpacity>
      </View>

      {isOpenDepartmentModal && (
        <ListDepartmentModal
          currentDepartment={currentDepartment}
          setCurrentDepartment={setCurrentDepartment}
          visible={isOpenDepartmentModal}
          setVisible={setIsOpenDepartmentModal}
          listDepartment={listDepartment.map((department: any) => {
            return {
              value: department.id,
              label: department.name,
            };
          })}
        />
      )}

      <MonthPickerModal
        visible={isOpenTimeSelect}
        setVisible={setIsOpenTimeSelect}
        setCurrentMonth={setCurrentMonth}
        currentMonth={currentMonth}
      />
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
    gap: 15,
    paddingHorizontal: 10,
  },
  align_end: {
    alignSelf: 'flex-end',
  },
  filter_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
