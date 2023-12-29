import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import TabBlock from '../../components/work/TabBlock.tsx';
import {useEffect, useMemo, useState} from 'react';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import AddIcon from '../../assets/img/add.svg';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import {fs_12_400, fs_14_400, text_black} from '../../assets/style.ts';
import TimeFilterModal from '../../components/common/modal/TimeFilterModal.tsx';
import WorkStatusFilterModal from '../../components/common/modal/WorkStatusFilterModal.tsx';
import {
  LIST_TIME_FILTER,
  LIST_WORK_STATUS_FILTER,
  WORK_STATUS_COLOR,
} from '../../assets/constant.ts';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import dayjs from 'dayjs';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';
import PlusButtonModal from '../../components/work/PlusButtonModal.tsx';
import MonthPickerModal from '../../components/common/modal/MonthPickerModal.tsx';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import ListDepartmentModal from '../../components/home/manager-tab/ListDepartmentModal.tsx';

const columns = [
  {
    key: 'index',
    title: 'STT',
    width: 0.1,
  },
  {
    key: 'name',
    title: 'Tên',
    width: 0.3,
  },
  {
    key: 'unit_name',
    title: 'ĐVT',
    width: 0.15,
  },
  {
    key: 'totalTarget',
    title: 'Chỉ tiêu',
    width: 0.15,
  },
  {
    key: 'totalComplete',
    title: 'Lũy kế',
    width: 0.15,
  },
  {
    key: 'todayTotal',
    title: 'Hôm nay',
    width: 0.15,
  },
];
export default function Work({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [statusValue, setStatusValue] = useState(LIST_WORK_STATUS_FILTER[0]);
  const [currentMonth, setCurrentMonth] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);
  const [isOpenStatusSelect, setIsOpenStatusSelect] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenPlusButton, setIsOpenPlusButton] = useState(false);
  const [addButtonPosition, setAddButtonPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  // const [currentWorkTab, setCurrentWorkTab] = useState(0);
  const {
    data: {listKeyWorkData, listNonKeyWorkData, listAriseWorkData} = {
      listKeyWorkData: [],
      listNonKeyWorkData: [],
      listAriseWorkData: [],
    },
    isLoading: isLoadingListWork,
    refetch: refetchListWork,
  } = useQuery(['getListKeyAndNonKeyWork'], async () => {
    const keyWorkRes = await dwtApi.getListWork({
      date: `${currentMonth.year}-${currentMonth.month + 1}`,
    });
    const arisWorkRes = await dwtApi.getListWorkArise({
      date: `${currentMonth.year}-${currentMonth.month + 1}`,
    });

    return {
      listKeyWorkData: keyWorkRes.data.kpi.keys,
      listNonKeyWorkData: keyWorkRes.data.kpi.noneKeys,
      listAriseWorkData: arisWorkRes.data.businessStandardWorkAriseAll,
    };
  });

  useEffect(() => {
    refetchListWork().then();
  }, [currentMonth]);

  const tableData = useMemo(() => {
    switch (currentTab) {
      case 0:
        return listKeyWorkData
          .map((work: any, index: number) => {
            const listLog = work.business_standard_report_logs || [];
            let totalToday = 0;
            if (listLog.length > 0) {
              const listTodayLog = listLog.filter(
                (log: any) =>
                  log.reported_date === dayjs().format('YYYY-MM-DD'),
              );
              listTodayLog.forEach((log: any) => {
                let temp = log.manager_quantity
                  ? log.manager_quantity
                  : log.quantity
                  ? log.quantity
                  : 0;
                if (temp > totalToday) {
                  totalToday = temp;
                }
              });
            }
            return {
              ...work,
              index: index + 1,
              todayTotal: totalToday,
              totalTarget:
                work.business_standard_quantity_display.split('/')[1],
              totalComplete: work.business_standard_result,
              bgColor: work.actual_state
                ? // @ts-ignore
                  WORK_STATUS_COLOR[work.actual_state]
                : '#FFF',
            };
          })
          .filter((work: any) => {
            if (statusValue.value === '0') {
              return true;
            }
            if (work.business_standard_reports.length > 0) {
              return (
                work.business_standard_reports[0].actual_state.toString() ===
                statusValue.value
              );
            }
            if (
              statusValue.value === '1' &&
              work.business_standard_reports.length === 0
            ) {
              return true;
            }
            return false;
          });
      case 1:
        return listNonKeyWorkData
          .map((work: any, index: number) => {
            const listLog = work.business_standard_report_logs || [];
            let totalToday = 0;
            if (listLog.length > 0) {
              const listTodayLog = listLog.filter(
                (log: any) =>
                  log.reported_date === dayjs().format('YYYY-MM-DD'),
              );
              listTodayLog.forEach((log: any) => {
                let temp = log.manager_quantity
                  ? log.manager_quantity
                  : log.quantity
                  ? log.quantity
                  : 0;
                if (temp > totalToday) {
                  totalToday = temp;
                }
              });
            }
            return {
              ...work,
              index: index + 1,
              todayTotal: totalToday,
              totalTarget:
                work.business_standard_quantity_display.split('/')[1],
              totalComplete: work.business_standard_result,
              bgColor: work.actual_state
                ? // @ts-ignore
                  WORK_STATUS_COLOR[work.actual_state]
                : '#FFF',
            };
          })
          .filter((work: any) => {
            if (statusValue.value === '0') {
              return true;
            }
            if (work.business_standard_reports.length > 0) {
              return (
                work.business_standard_reports[0].actual_state.toString() ===
                statusValue.value
              );
            }
            if (
              statusValue.value === '1' &&
              work.business_standard_reports.length === 0
            ) {
              return true;
            }
            return false;
          });
      case 2:
        return listAriseWorkData.map((work: any, index: number) => {
          const listLog = work.business_standard_arise_logs || [];
          let totalAmountCompleted =
            work.business_standard_quantity_display.split('/')[0];
          let totalTarget =
            work.business_standard_quantity_display.split('/')[1];

          let totalToday = 0;
          if (listLog.length > 0) {
            const listTodayLog = listLog.filter(
              (log: any) => log.reported_date === dayjs().format('YYYY-MM-DD'),
            );
            listTodayLog.forEach((log: any) => {
              let temp = log.manager_quantity
                ? log.manager_quantity
                : log.quantity
                ? log.quantity
                : 0;
              if (temp > totalToday) {
                totalToday = temp;
              }
            });
          }
          return {
            ...work,
            index: index + 1,
            totalTarget: totalTarget,
            totalComplete: totalAmountCompleted,
            todayTotal: totalToday,
            bgColor: work.actual_state
              ? // @ts-ignore
                WORK_STATUS_COLOR[work.actual_state]
              : '#FFF',
            isWorkArise: true,
          };
        });
      default:
        return [];
    }
  }, [
    currentTab,
    statusValue,
    listKeyWorkData,
    listNonKeyWorkData,
    listAriseWorkData,
  ]);

  useRefreshOnFocus(refetchListWork);

  if (isLoadingListWork) {
    return <PrimaryLoading />;
  }

  return (
    userInfo && (
      <SafeAreaView style={styles.wrapper}>
        <Header
          title={'NHẬT TRÌNH CÔNG VIỆC'}
          handleGoBack={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}>
          <View style={styles.content}>
            {/*{userInfo && userInfo.role === 'admin' && (*/}
            {/*  <AdminTabBlock*/}
            {/*    currentTab={currentWorkTab}*/}
            {/*    setCurrentTab={setCurrentWorkTab}*/}
            {/*  />*/}
            {/*)}*/}
            <TabBlock currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <View style={styles.filter_wrapper}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setIsOpenStatusSelect(true);
                }}>
                <Text style={[text_black, fs_14_400]}>{statusValue.label}</Text>
                <DropdownIcon width={20} height={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setIsOpenTimeSelect(true);
                }}>
                <Text style={[text_black, fs_14_400]}>
                  {currentMonth.month + 1}/{currentMonth.year}
                </Text>
                <DropdownIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
            <View style={[styles.px15]}>
              <PrimaryTable
                data={tableData}
                columns={columns}
                canShowMore={true}
              />
            </View>
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
        <WorkStatusFilterModal
          visible={isOpenStatusSelect}
          setVisible={setIsOpenStatusSelect}
          setStatusValue={setStatusValue}
          statusValue={statusValue}
        />
        <MonthPickerModal
          visible={isOpenTimeSelect}
          setVisible={setIsOpenTimeSelect}
          setCurrentMonth={setCurrentMonth}
          currentMonth={currentMonth}
        />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  content: {
    gap: 10,
  },
  px15: {
    paddingHorizontal: 15,
  },
  filter_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  pl10: {
    paddingLeft: 10,
  },
  dropdownAdminDepartment: {
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
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
