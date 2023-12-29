import Header from '../../components/header/Header.tsx';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fs_14_400, text_black} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';
import AddIcon from '../../assets/img/add.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import ProposeStatusFilterModal from '../../components/common/modal/ProposeStatusFilterModal.tsx';
import DatePickerModal from '../../components/common/modal/DatePickerModal.tsx';

export default function Propose({navigation}: any) {
  const [isOpenStatusSelect, setIsOpenStatusSelect] = useState(false);
  const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);
  const [statusValue, setStatusValue] = useState({
    label: 'Tất cả',
    value: 'all',
  });

  const columns = [
    {
      key: 'index',
      title: 'TT',
      width: 0.1,
    },
    {
      key: 'name',
      title: 'Vấn đề',
      width: 0.35,
    },
    {
      key: 'creator',
      title: 'Người nêu',
      width: 0.3,
    },
    {
      key: 'date',
      title: 'Ngày phát sinh',
      width: 0.25,
    },
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title={'DANH SÁCH ĐỀ XUẤT'}
        handleGoBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.filter_wrapper}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setIsOpenStatusSelect(true);
            }}>
            <Text style={[text_black, fs_14_400]}>{'Trang thai'}</Text>
            <DropdownIcon width={20} height={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setIsOpenTimeSelect(true);
            }}>
            <Text style={[text_black, fs_14_400]}>Thowi gian</Text>
            <DropdownIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View>
          <PrimaryTable
            data={[
              {
                name: 'Vấn đề 1',
                creator: 'Người nêu 1',
                date: '01/01/2021',
                index: 1,
                bgColor: '#FBF2CA',
              },
            ]}
            columns={columns}
          />
        </View>
        <TouchableOpacity
          style={styles.align_end}
          onPress={() => {
            navigation.navigate('AddPropose');
          }}>
          <AddIcon width={32} height={32} />
        </TouchableOpacity>
      </ScrollView>
      <ProposeStatusFilterModal
        visible={isOpenStatusSelect}
        setVisible={setIsOpenStatusSelect}
        setStatusValue={setStatusValue}
        statusValue={statusValue}
      />
      <DatePickerModal
        visible={isOpenTimeSelect}
        setVisible={setIsOpenTimeSelect}
        currentDate={''}
        setCurrentDate={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    gap: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
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
  align_end: {
    alignSelf: 'flex-end',
  },
});
