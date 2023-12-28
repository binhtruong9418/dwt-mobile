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
import SalaryItemIcon from '../../assets/img/wallet_icon.svg';
import dayjs from 'dayjs';
import {
  fs_12_700,
  fs_14_400, fs_15_700, fw_bold,
  text_black,
  text_center,
  text_gray, text_green, text_red, text_right,
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
  console.log("salaryInfo", salaryInfo);

  if (isLoadingSalary) {
    return <PrimaryLoading/>;
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
              <CheckSalaryIcon/>
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

          <View style={{...styles.box, marginTop: 20, backgroundColor: '#fff'}}>
            <Text
              style={[
                text_gray,
              ]}>
              Chi trả qua
            </Text>

            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                gap: 5,
              }}>
              <SalaryItemIcon width={30} height={30}/>
              <View style={{
                marginLeft: 20,
              }}>
                <Text
                  style={[
                    fs_14_400,
                    text_black,
                  ]}>
                  Tên tài khoản: <Text style={{fontWeight: 'bold'}}>
                  {salaryInfo?.transfer_information?.receiver_name}
                </Text>
                </Text>

                <Text
                  style={[
                    fs_14_400,
                    text_black,
                  ]}>
                  Số tài khoản: <Text style={{fontWeight: 'bold'}}>
                  {salaryInfo?.transfer_information?.bank_number}
                </Text>
                </Text>

                <Text
                  style={[
                    fs_14_400,
                    text_black,
                  ]}>
                  Ngân hàng: <Text style={{fontWeight: 'bold'}}>
                  {salaryInfo?.transfer_information?.bank_name}
                </Text>
                </Text>
              </View>
            </View>

          </View>

          <View style={{...styles.box, marginTop: 20, backgroundColor: '#fff'}}>
            <Text
              style={[
                text_red,
                text_center,
                fs_15_700,
                {
                  marginBottom: 10,
                },
              ]}>
              Phiếu lương
            </Text>
            <View style={styles.table}>
              {/* Header */}
              <View style={[styles.row]}>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_center,
                    fw_bold,
                  ]}>Khoản</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_center,
                    fw_bold,
                  ]}>Tạm tính</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_center,
                    fw_bold,
                  ]}>Mức HT</Text>
                </View>
              </View>

              {/* Rows */}
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                  ]}>Lương cơ bản</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.basic_salary?.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.basic_salary?.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Add more rows as needed */}

              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                  ]}>Lương năng suất / KPI</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.salary_history?.performance_salary?.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.salary_history?.performance_salary?.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                  ]}>Phụ cấp</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.salary_history?.allowance?.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.salary_history?.allowance?.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                  ]}>Lương chức danh</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.salary_history?.salary_title?.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>
                    {salaryInfo?.salary_history?.salary_title?.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                  ]}>Các khoản giảm trừ phạt</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>0</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[
                    text_black,
                    text_right,
                    fw_bold
                  ]}>0</Text>
                </View>
              </View>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
              <Text
                style={[
                  text_red,
                  fs_15_700,
                  {
                    marginBottom: 10,
                    marginRight: 10,
                  },
                ]}>
                Tổng
              </Text>
              <View>
                <Text
                  style={[
                    text_green,
                    text_center,
                    fs_15_700,
                  ]}>
                  {salaryInfo?.totalSalary?.toLocaleString()}
                </Text>
                <Text
                  style={[
                    text_black,
                    text_center,
                    fs_15_700,
                  ]}>
                  ( {salaryInfo?.totalSalary?.toLocaleString()})
                </Text>
              </View>
            </View>
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
  table: {
    // borderWidth: 1,
    // borderColor: '#000',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#000',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#efefef',
  }
});