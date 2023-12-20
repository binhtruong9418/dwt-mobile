import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header/Header.tsx';
import ProgressBlock from '../../components/work/ProgressBlock.tsx';
import TabBlock from '../../components/work/TabBlock.tsx';
import PrimaryDropdown from '../../components/common/dropdown/PrimaryDropdown.tsx';
import {useState} from 'react';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import AddIcon from '../../assets/img/add.svg';

export default function Work({navigation}: any) {
  const [value, setValue] = useState<string | null>('value1');

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
      bgColor: '#FBF2CA',
    },
    {
      index: 2,
      name: 'Thăm hỏi đại lý',
      unit: 'Lần',
      amount: '10',
      kpi: '2',
      bgColor: '#7CB8FF',
    },
    {
      index: 3,
      name: 'Khảo sát thị trường',
      unit: 'Lượt',
      amount: '5',
      kpi: '2',
      bgColor: '#FBF2CA',
    },
    {
      index: 4,
      name: 'Thăm hỏi đại lý',
      unit: 'Lượt',
      amount: '5',
      kpi: '2',
      bgColor: '#FF4D56',
    },
    {
      index: 5,
      name: 'Thăm hỏi đại lý',
      unit: 'Lượt',
      amount: '5',
      kpi: '2',
      bgColor: '#00FA52',
    },
  ];
  return (
    <View style={styles.wrapper}>
      <Header title={'NHẬT TRÌNH CÔNG VIỆC'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ProgressBlock />
          <TabBlock />
          <View style={styles.filter_wrapper}>
            <PrimaryDropdown
              data={[
                {label: 'label1', value: 'value1'},
                {label: 'label2', value: 'value2'},
                {label: 'label3', value: 'value3'},
              ]}
              changeValue={setValue}
              value={value}
              dropdownStyle={styles.dropdown}
            />

            <PrimaryDropdown
              data={[
                {label: 'label1', value: 'value1'},
                {label: 'label2', value: 'value2'},
                {label: 'label3', value: 'value3'},
              ]}
              changeValue={setValue}
              value={value}
              dropdownStyle={styles.dropdown}
            />
          </View>
          <View style={[styles.px15]}>
            <PrimaryTable data={tableData} columns={columns} />
          </View>
          <TouchableOpacity style={styles.align_end}>
            <AddIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: '48%',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fff',
  },
  align_end: {
    alignSelf: 'flex-end',
    paddingRight: 15,
  },
});
