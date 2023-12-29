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
import {useMemo, useState} from 'react';
import ProposeStatusFilterModal from '../../components/common/modal/ProposeStatusFilterModal.tsx';
import DatePickerModal from '../../components/common/modal/DatePickerModal.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';
import {
  LIST_PROPOSE_STATUS,
  LIST_PROPOSE_STATUS_COLOR,
} from '../../assets/constant.ts';
import dayjs from 'dayjs';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';

export default function Propose({navigation}: any) {
  const [isOpenStatusSelect, setIsOpenStatusSelect] = useState(false);
  const [isOpenTimeSelect, setIsOpenTimeSelect] = useState(false);
  const [statusValue, setStatusValue] = useState(LIST_PROPOSE_STATUS[0]);
  const [timeValue, setTimeValue] = useState(dayjs());
  const columns = [
    {
      key: 'index',
      title: 'TT',
      width: 0.1,
    },
    {
      key: 'description',
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

  const {
    data: listPropose = [],
    isLoading: isProposeLoading,
    refetch: refetchPropose,
  } = useQuery(
    ['listPropose', statusValue, timeValue],
    async ({queryKey}: any) => {
      const response = await dwtApi.getAllPropose({
        status: queryKey[1].value === 0 ? undefined : queryKey[1].value,
        created_at: dayjs(queryKey[2]).format('YYYY-MM-DD'),
      });
      return response.data.data;
    },
  );

  const tableData = useMemo(() => {
    const data = listPropose.map((item: any, index: number) => {
      return {
        ...item,
        index: index + 1,
        creator: item.user.name,
        date: dayjs(item.created_at).format('DD/MM/YYYY'),
        bgColor: item.status
          ? // @ts-ignore
            LIST_PROPOSE_STATUS_COLOR[item.status]
          : '#FFF',
      };
    });
    return data;
  }, [listPropose]);

  useRefreshOnFocus(refetchPropose);

  // if (isProposeLoading) {
  //   return <PrimaryLoading />;
  // }

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
            <Text style={[text_black, fs_14_400]}>{statusValue.label}</Text>
            <DropdownIcon width={20} height={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setIsOpenTimeSelect(true);
            }}>
            <Text style={[text_black, fs_14_400]}>
              {dayjs(timeValue).format('DD/MM/YYYY')}
            </Text>
            <DropdownIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View>
          <PrimaryTable
            data={tableData}
            columns={columns}
            headerColor={'#D9D9D9'}
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
        currentDate={timeValue}
        setCurrentDate={setTimeValue}
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
