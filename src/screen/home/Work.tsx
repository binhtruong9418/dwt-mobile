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
import {useMemo, useState} from 'react';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import AddIcon from '../../assets/img/add.svg';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import {fs_12_400, text_black} from '../../assets/style.ts';
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
    key: 'amount',
    title: 'Chỉ tiêu',
    width: 0.15,
  },
  {
    key: 'accumulatedTotal',
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
  const [statusValue, setStatusValue] = useState(LIST_WORK_STATUS_FILTER[0]);
  const [timeValue, setTimeValue] = useState(LIST_TIME_FILTER[0]);
  const [timeCustomValue, setTimeCustomValue] = useState({
    fromDate: null,
    toDate: null,
  });
  const [onOpenTimeSelect, setOnOpenTimeSelect] = useState(false);
  const [onOpenStatusSelect, setOnOpenStatusSelect] = useState(false);
  const [paramsSearch, setParamsSearch] = useState({
    date: '',
  });
  const [currentTab, setCurrentTab] = useState(0);

  const {
    data: {listKeyWorkData, listNonKeyWorkData, listAriseWorkData} = {
      listAriseWorkData: [],
      listKeyWorkData: [],
      listNonKeyWorkData: [],
    },
    isLoading: isLoadingListWork,
  } = useQuery(['getListKeyAndNonKeyWork'], async () => {
    const keyWorkRes = await dwtApi.getListWork(paramsSearch);
    const arisWorkRes = await dwtApi.getListWorkArise(paramsSearch);
    return {
      listKeyWorkData: keyWorkRes.data.business_standard_key_all,
      listNonKeyWorkData: keyWorkRes.data.business_standard_non_key_all,
      listAriseWorkData: arisWorkRes.data.businessStandardWorkArise.data,
    };
  });

  const tableData = useMemo(() => {
    switch (currentTab) {
      case 0:
        return listKeyWorkData
          .map((work: any, index: number) => {
            return {
              ...work,
              index: index + 1,
              amount: work.business_standard_quantity_display || '0/0',
              accumulatedTotal: 0,
              todayTotal: 0,
              totalTarget:
                work.business_standard_quantity_display.split('/')[1],
              totalComplete: work.business_standard_result,
              bgColor:
                work.business_standard_reports.length > 0
                  ? // @ts-ignore
                    WORK_STATUS_COLOR[
                      work.business_standard_reports[0].actual_state
                    ]
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
            return {
              ...work,
              index: index + 1,
              amount: work.business_standard_quantity_display || '0/0',
              accumulatedTotal: 0,
              todayTotal: 0,
              totalTarget:
                work.business_standard_quantity_display.split('/')[1],
              totalComplete: work.business_standard_result,
              bgColor:
                work.business_standard_reports.length > 0
                  ? // @ts-ignore
                    WORK_STATUS_COLOR[
                      work.business_standard_reports[0].actual_state
                    ]
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
          const totalAmountCompleted =
            listLog.length > 0 && listLog[listLog.length - 1].quantity
              ? listLog[listLog.length - 1].quantity
              : 0;
          const totalAmount = work.quantity ? work.quantity : 0;
          return {
            ...work,
            index: index + 1,
            amount: totalAmountCompleted + '/' + totalAmount,
            totalTarget: totalAmount,
            totalComplete: totalAmountCompleted,
            accumulatedTotal: 0,
            todayTotal: 0,
            bgColor:
              listLog.length > 0 && listLog[listLog.length - 1].actual_state
                ? // @ts-ignore
                  WORK_STATUS_COLOR[listLog[listLog.length - 1].actual_state]
                : '#FFF',
          };
        });
      default:
        return [];
    }
  }, [
    currentTab,
    statusValue,
    timeValue,
    listKeyWorkData,
    listNonKeyWorkData,
    listAriseWorkData,
  ]);

  if (isLoadingListWork) {
    return <PrimaryLoading />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title={'NHẬT TRÌNH CÔNG VIỆC'}
        handleGoBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TabBlock currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <View style={styles.filter_wrapper}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setOnOpenStatusSelect(true);
              }}>
              <Text style={[text_black, fs_12_400]}>{statusValue.label}</Text>
              <DropdownIcon width={20} height={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setOnOpenTimeSelect(true);
              }}>
              <Text style={[text_black, fs_12_400]}>{timeValue.label}</Text>
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
          <TouchableOpacity style={styles.align_end}>
            <AddIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TimeFilterModal
        visible={onOpenTimeSelect}
        setVisible={setOnOpenTimeSelect}
        setTimeValue={setTimeValue}
        timeCustomValue={timeCustomValue}
        setTimeCustomValue={setTimeCustomValue}
      />
      <WorkStatusFilterModal
        visible={onOpenStatusSelect}
        setVisible={setOnOpenStatusSelect}
        setStatusValue={setStatusValue}
        statusValue={statusValue}
      />
    </SafeAreaView>
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
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  pl10: {
    paddingLeft: 10,
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
