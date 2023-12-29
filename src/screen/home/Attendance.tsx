import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useConnection} from '../../redux/connection';
import dayjs from 'dayjs';
import {fs_15_400, text_center, text_red} from '../../assets/style.ts';
import CheckWorkBlock from '../../components/attendance/CheckWorkBlock.tsx';

export default function Attendance({navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header title={'CHẤM CÔNG'} handleGoBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={[fs_15_400, text_red, text_center]}>
          Ngày {dayjs().format('DD/MM/YYYY')}
        </Text>
        <CheckWorkBlock />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
});
