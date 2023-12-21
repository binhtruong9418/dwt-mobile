import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/header/Header.tsx';
import ProgressBlock from '../../components/work/ProgressBlock.tsx';
import TabBlock from '../../components/work/TabBlock.tsx';
import {useState} from 'react';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import AddIcon from '../../assets/img/add.svg';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import {fs_12_400, text_black} from '../../assets/style.ts';
import TimeFilterModal from '../../components/common/modal/TimeFilterModal.tsx';
import WorkStatusFilterModal from '../../components/common/modal/WorkStatusFilterModal.tsx';
import {
  LIST_TIME_FILTER,
  LIST_WORK_STATUS_FILTER,
} from '../../assets/constant.ts';

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
    key: 'unit',
    title: 'ĐVT',
    width: 0.2,
  },
  {
    key: 'amount',
    title: 'Số lượng',
    width: 0.2,
  },
  {
    key: 'kpi',
    title: 'NS/KPI',
    width: 0.2,
  },
];
const tableData = [
  {
    index: 1,
    name: 'Chào giá xe',
    unit: 'Lượt',
    amount: '5',
    kpi: '2',
    bgColor: '#FFB822',
  },
  {
    index: 2,
    name: 'Thăm hỏi đại lý',
    unit: 'Lần',
    amount: '10',
    kpi: '2',
    bgColor: '#89B6FA',
  },
  {
    index: 3,
    name: 'Khảo sát thị trường',
    unit: 'Lượt',
    amount: '5',
    kpi: '2',
    bgColor: '#FFB822',
  },
  {
    index: 4,
    name: 'Thăm hỏi đại lý',
    unit: 'Lượt',
    amount: '5',
    kpi: '2',
    bgColor: '#F5325C',
  },
  {
    index: 5,
    name: 'Thăm hỏi đại lý',
    unit: 'Lượt',
    amount: '5',
    kpi: '2',
    bgColor: '#03D87F',
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
  return (
    <View style={styles.wrapper}>
      <Header title={'NHẬT TRÌNH CÔNG VIỆC'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ProgressBlock />
          <TabBlock />
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    gap: 10,
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
