import {StyleSheet, Text, View} from 'react-native';
import {fs_12_400, text_black} from '../../../assets/style.ts';
import MeetingIcon from '../../../assets/img/meeting-icon.svg';
import ProposeIcon from '../../../assets/img/propose-icon.svg';

export default function ReportAndProposeBlock({totalDailyReport}: any) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.item}>
        <View style={styles.leftItem}>
          <MeetingIcon width={20} height={20} />
          <Text style={[fs_12_400, text_black]}>Báo cáo ngày</Text>
        </View>
        <Text style={[fs_12_400, text_black]}>{totalDailyReport}</Text>
      </View>

      <View style={[styles.item, styles.borderLeft]}>
        <View style={styles.leftItem}>
          <ProposeIcon width={20} height={20} />
          <Text style={[fs_12_400, text_black]}>Đề xuất vấn đề</Text>
        </View>
        <Text style={[fs_12_400, text_black]}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 6,
    backgroundColor: '#D9E3F5',
    flexDirection: 'row',
  },
  item: {
    flex: 0.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: '#000',
  },
});
