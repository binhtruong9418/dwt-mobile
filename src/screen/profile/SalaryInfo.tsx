import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {
  fs_12_400,
  fs_14_400,
  fs_14_500,
  text_black,
  text_gray,
} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import {useState} from 'react';
import PrimaryDropdown from '../../components/common/dropdown/PrimaryDropdown.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import SalaryItemIcon from '../../assets/img/salary-item-icon.svg';
import dayjs from 'dayjs';
import MonthPickerModal from '../../components/common/modal/MonthPickerModal.tsx';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';

export default function SalaryInfo({navigation}: any) {
  const [isOpenMonthSelect, setIsOpenMonthSelect] = useState(false);
  const [currentMonth, setCurrentMonth] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const [salaryMode, setSalaryMode] = useState(0);

  const {
    data: listSalary = [],
    isLoading: isLoadingListSalary,
    refetch: refetchListSalary,
  } = useQuery(['listSalary'], async () => {
    const res = await dwtApi.getSalaryHistory();
    return res.data.data;
  });

  useRefreshOnFocus(refetchListSalary);
  if (isLoadingListSalary) {
    return <PrimaryLoading />;
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title={'Lịch sử lương'}
        handleGoBack={() => navigation.navigate('Profile')}
      />

      <View style={styles.filter_wrapper}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setIsOpenMonthSelect(true);
          }}>
          <Text style={[text_black, fs_14_400]}>
            {currentMonth.month + 1}/{currentMonth.year}
          </Text>
          <DropdownIcon width={20} height={20} />
        </TouchableOpacity>

        <PrimaryDropdown
          data={[
            {
              label: 'Tất cả',
              value: 0,
            },
            {
              label: 'Thay đổi lương',
              value: 2,
            },
          ]}
          changeValue={setSalaryMode}
          value={salaryMode}
          dropdownStyle={{
            width: '47%',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#D9D9D9',
            paddingHorizontal: 10,
          }}
          isSearch={false}
          placeholder={'Tất cả'}
          textStyle={{
            ...fs_14_400,
            ...text_black,
          }}
        />
      </View>
      <View style={styles.countSalaryBox}>
        <Text>{listSalary.length} phiếu lương</Text>
      </View>
      <FlatList
        data={listSalary}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 10,
        }}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => {
          return (
            <TouchableOpacity
              style={[
                styles.item,
                {
                  backgroundColor:
                    item.paid_salary === 1 ? '#FFF8C3' : '#CCF4D3',
                },
              ]}
              onPress={() => {
                navigation.navigate('SalaryDetail', {
                  id: item.id,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <SalaryItemIcon width={30} height={30} />
                <View
                  style={{
                    gap: 5,
                  }}>
                  <Text style={[fs_14_400, text_black]}>
                    Phiếu lương tháng {item.month}/{item.year}
                  </Text>
                  <Text style={[fs_12_400, text_black]}>
                    Vị trí: {item.position_name}
                  </Text>
                  <Text style={[fs_12_400, text_gray]}>
                    Thời gian chi trả:{' '}
                    {dayjs(item.pay_day).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <Text style={[fs_14_500, text_black]}>1.000.000</Text>
                <Text
                  style={[
                    fs_12_400,
                    {
                      color: '#679AE6',
                    },
                  ]}>
                  Xem chi tiết
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
      <MonthPickerModal
        visible={isOpenMonthSelect}
        setVisible={setIsOpenMonthSelect}
        currentMonth={setCurrentMonth}
        setCurrenMonth={setCurrentMonth}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filter_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  pl10: {
    paddingLeft: 10,
  },
  dropdown: {
    width: '47%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  countSalaryBox: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 10,
  },
});
