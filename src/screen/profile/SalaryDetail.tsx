import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import SalaryItemIcon from '../../assets/img/salary-item-icon.svg';
import dayjs from 'dayjs';
import {
  fs_12_700,
  fs_14_400,
  text_black,
  text_center,
  text_gray,
} from '../../assets/style.ts';
import CheckSalaryIcon from '../../assets/img/check-salary.svg';

export default function SalaryDetail({route, navigation}: any) {
  const {id} = route.params;
  const {data: salaryInfo, isLoading: isLoadingSalary} = useQuery(
    ['salaryDetail'],
    async () => {
      const res = await dwtApi.getSalaryById(2);
      return res.data;
    },
    {
      enabled: !!id,
    },
  );

  if (isLoadingSalary) {
    return <PrimaryLoading />;
  }
  return (
    salaryInfo && (
      <SafeAreaView style={styles.wrapper}>
        <Header
          title={`Chi tiết phiếu lương ${salaryInfo?.salary_history?.month} / ${salaryInfo?.salary_history?.year}`}
          handleGoBack={() => navigation.navigate('SalaryInfo')}
        />
        <ScrollView
          style={{
            marginTop: 30,
          }}>
          <View style={styles.box}>
            <Text
              style={[
                text_center,
                text_black,
                {
                  fontSize: 26,
                  fontWeight: '700',
                },
              ]}>
              {salaryInfo?.totalSalary?.toLocaleString()}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 5,
                gap: 5,
              }}>
              <CheckSalaryIcon />
              <Text
                style={[
                  {
                    color: '#00894F',
                  },
                  fs_12_700,
                ]}>
                Đã chi trả
              </Text>
            </View>
            <Text
              style={[
                fs_14_400,
                text_gray,
                text_center,
                {
                  marginTop: 5,
                },
              ]}>
              Thời gian chi trả {salaryInfo?.salary_history?.pay_day}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

  box: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    padding: 10,
  },
});
