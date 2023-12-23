import {StyleSheet, Text, View} from 'react-native';
import {
  fs_12_500,
  fs_14_500,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';
import RowSummaryItem from './RowSummaryItem.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';

export default function SummaryBlock({monthOverview}: any) {
  const [progress, setProgress] = useState<number>(monthOverview.percent / 100);
  const [boxHeight, setBoxHeight] = useState<number>(0);
  return (
    <View style={styles.wrapper}>
      <Text style={[fs_14_500, text_red, text_center]}>TỔNG QUÁT THÁNG</Text>
      <View style={styles.row_center}>
        <View style={[styles.statistic]}>
          <Text style={[styles.percent, text_center]}>100%</Text>
          <Text style={[styles.percent, text_center]}>75%</Text>
          <Text style={[styles.percent, text_center]}>50%</Text>
          <Text style={[styles.percent, text_center]}>25%</Text>
          <Text style={[styles.percent, text_center]}>0%</Text>
        </View>
        <View
          style={styles.box}
          onLayout={e => {
            setBoxHeight(e.nativeEvent.layout.height);
          }}>
          <View
            style={[
              styles.leftCursor,
              {
                bottom: (boxHeight - 2) * progress - 2.5,
              },
            ]}
          />
          <LinearGradient
            colors={['#7cf6c3', '#fff']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0.1, 1]}
            style={[
              styles.chart,
              {height: (boxHeight - 2) * progress},
              {
                borderTopLeftRadius: progress === 1 ? 15 : 0,
                borderTopRightRadius: progress === 1 ? 15 : 0,
              },
            ]}
          />
          <View style={styles.boxText}>
            <Text style={[fs_12_500, text_black, text_center]}>
              KPI cá nhân
            </Text>
            {monthOverview.tasks.map((task: any, index: number) => {
              return (
                <RowSummaryItem
                  key={index}
                  text={task.name}
                  value={task.kpi ? task.kpi : 0}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.box}>
          <View
            style={[
              styles.rightCursor,
              {
                bottom: (boxHeight - 2) * progress - 2.5,
              },
            ]}
          />
          <LinearGradient
            colors={['#7cf6c3', '#fff']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0.1, 1]}
            style={[
              styles.chart,
              {height: (boxHeight - 2) * progress},
              {
                borderTopLeftRadius: progress === 1 ? 15 : 0,
                borderTopRightRadius: progress === 1 ? 15 : 0,
              },
            ]}
          />
          <View style={styles.boxText}>
            <Text style={[fs_12_500, text_black, text_center]}>KPI phòng</Text>
            <RowSummaryItem text={'Hàn hoàn thiện khung xe'} value={'3'} />
            <RowSummaryItem text={'Cắt uốn khung'} value={'3'} />
            <RowSummaryItem text={'Làm sạch bề mặt khung'} value={'4'} />
            <RowSummaryItem text={'Lắp ráp hoàn thiện xe'} value={'5'} />
            <RowSummaryItem text={'Nâng cấp xe'} value={'3'} />
          </View>
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
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  leftCursor: {
    position: 'absolute',
    right: 0,
    width: 5,
    height: 3,
    zIndex: 2,
    backgroundColor: '#0B9621',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  rightCursor: {
    position: 'absolute',
    left: 0,
    width: 5,
    height: 3,
    zIndex: 2,
    backgroundColor: '#0B9621',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  row_center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statistic: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    height: '100%',
  },
  chart: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  box: {
    width: '46%',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    position: 'relative',
  },
  boxText: {
    width: '100%',
    padding: 7,
    gap: 6,
  },
  percent: {
    color: '#60758D',
    fontSize: 7,
    fontWeight: '400',
    lineHeight: 8,
  },
});
