import {StyleSheet, Text, View} from 'react-native';
import {
  fs_10_400,
  fs_12_500,
  fs_14_500,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';
import RowSummaryItem from './RowSummaryItem.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';

export default function SummaryBlock({}) {
  const [labelHeight, setLabelHeight] = useState<number>(0);
  const [wrapperHeight, setWrapperHeight] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0.75);
  return (
    <View
      style={styles.wrapper}
      onLayout={e => setWrapperHeight(e.nativeEvent.layout.height)}>
      <Text
        style={[fs_14_500, text_red, text_center]}
        onLayout={e => setLabelHeight(e.nativeEvent.layout.height)}>
        TỔNG QUÁT THÁNG
      </Text>
      <View
        style={[styles.statistic, {height: wrapperHeight - labelHeight - 20}]}>
        <Text style={[styles.percent, text_center]}>100%</Text>
        <Text style={[styles.percent, text_center]}>75%</Text>
        <Text style={[styles.percent, text_center]}>50%</Text>
        <Text style={[styles.percent, text_center]}>25%</Text>
        <Text style={[styles.percent, text_center]}>0%</Text>
      </View>
      <LinearGradient
        colors={['#7cf6c3', '#fff']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0.1, 1]}
        style={[
          styles.chart,
          {height: (wrapperHeight - labelHeight - 20) * progress},
        ]}
      />
      <View style={styles.row_center}>
        <View style={styles.box}>
          <Text style={[fs_12_500, text_black, text_center]}>KPI cá nhân</Text>
          <RowSummaryItem text={'Hàn hoàn thiện khung xe'} value={'3'} />
          <RowSummaryItem text={'Cắt uốn khung'} value={'3'} />
          <RowSummaryItem text={'Làm sạch bề mặt khung'} value={'4'} />
          <RowSummaryItem text={'Lắp ráp hoàn thiện xe'} value={'5'} />
          <RowSummaryItem text={'Nâng cấp xe'} value={'3'} />
        </View>

        <View style={styles.box}>
          <Text style={[fs_12_500, text_black, text_center]}>KPI phòng</Text>
          <RowSummaryItem text={'Hàn hoàn thiện khung xe'} value={'3'} />
          <RowSummaryItem text={'Cắt uốn khung'} value={'3'} />
          <RowSummaryItem text={'Làm sạch bề mặt khung'} value={'4'} />
          <RowSummaryItem text={'Lắp ráp hoàn thiện xe'} value={'5'} />
          <RowSummaryItem text={'Nâng cấp xe'} value={'3'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingTop: 8,
  },
  row_center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flex: 1,
    gap: 20,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  statistic: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  chart: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    borderTopColor: '#090',
    borderTopWidth: 3,
  },
  box: {
    padding: 7,
    flex: 0.5,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    gap: 6,
  },
  percent: {
    color: '#60758D',
    fontSize: 7,
    fontWeight: '400',
    lineHeight: 8,
  },
});
