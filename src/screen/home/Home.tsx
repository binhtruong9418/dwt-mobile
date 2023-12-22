import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import HomeHeader from '../../components/home/HomeHeader.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from '../../assets/img/banner.svg';
import WorkProgressBlock from '../../components/home/WorkProgressBlock.tsx';
import SummaryBlock from '../../components/home/SummaryBlock.tsx';
import {py20} from '../../assets/style.ts';
import BehaviorBlock from '../../components/home/BehaviorBlock.tsx';
import PrimaryTable from '../../components/common/table/PrimaryTable.tsx';

const {width: windowWidth} = Dimensions.get('window');

export default function Home({navigation}: any) {
  const columns = [
    {
      key: 'index',
      title: 'STT',
      width: 0.1,
    },
    {
      key: 'name',
      title: 'Tên',
      width: 0.4,
    },
    {
      key: 'amount',
      title: 'Số lượng',
      width: 0.25,
    },
    {
      key: 'kpi',
      title: 'NS/KPI',
      width: 0.25,
    },
  ];
  const tableData = [
    {
      index: 1,
      name: 'Báo cáo',
      amount: '3/10',
      kpi: '2',
      bgColor: '#FFB822',
    },

    {
      index: 2,
      name: 'Đào tạo',
      amount: '3/2',
      kpi: '6',
      bgColor: '#03D87F',
    },

    {
      index: 3,
      name: 'Bảo dưỡng xe',
      amount: '3/2',
      kpi: '2',
      bgColor: '#89B6FA',
    },

    {
      index: 4,
      name: 'Bảo dưỡng xe',
      amount: '3/10',
      kpi: '2',
      bgColor: '#FFF',
    },
    {
      index: 5,
      name: 'Báo cáo',
      amount: '3/10',
      kpi: '2',
      bgColor: '#F5325C',
    },

    {
      index: 6,
      name: 'Đào tạo',
      amount: '3/2',
      kpi: '6',
      bgColor: '#03D87F',
    },
  ];
  return (
    <SafeAreaView style={styles.wrapper}>
      <HomeHeader />
      <ScrollView
        style={styles.container}
        contentContainerStyle={py20}
        showsVerticalScrollIndicator={false}>
        <Banner
          width={windowWidth}
          height={(windowWidth / 16) * 9}
          style={[styles.banner]}
        />
        <View style={styles.content}>
          <WorkProgressBlock />
          <SummaryBlock />
          <BehaviorBlock />
          <PrimaryTable columns={columns} data={tableData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    position: 'relative',
  },
  content: {
    gap: 12,
    paddingHorizontal: 10,
  },
});
