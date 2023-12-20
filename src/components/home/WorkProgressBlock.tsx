import {View, StyleSheet, Text} from 'react-native';
import {
  fs_12_400,
  fs_12_500,
  mt10,
  row_between,
  text_black,
  text_center,
  text_red,
} from '../../assets/style';
import CalendarIcon from '../../assets/img/calendar-icon.svg';
import ClockIcon from '../../assets/img/clock-icon.svg';
import ClockOtIcon from '../../assets/img/clock-ot-icon.svg';
import CircleProgressChart from './CircleProgressChart';
export default function WorkProgressBlock({}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.blockItem}>
        <View style={[row_between, styles.mb4]}>
          <View style={styles.row_gap3}>
            <ClockIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Ngày công</Text>
          </View>
          <Text style={[fs_12_400, text_black]}>15/24</Text>
        </View>

        <View style={[row_between, styles.mb4]}>
          <View style={styles.row_gap3}>
            <CalendarIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Đã nghỉ / vắng</Text>
          </View>
          <Text style={[fs_12_400, text_black]}>02</Text>
        </View>

        <View style={[row_between, styles.mb4]}>
          <View style={styles.row_gap3}>
            <ClockOtIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Dự kiến bù - tăng ca</Text>
          </View>
          <Text style={[fs_12_400, text_red]}>09</Text>
        </View>

        <Text style={[fs_12_500, text_red, text_center, mt10]}>
          Vào: 00:00 - Ra: 00:00
        </Text>
      </View>

      <View style={styles.blockItem}>
        <Text style={[fs_12_500, text_red, text_center]}>
          Lượng việc (Điểm)
        </Text>
        <View style={[row_between, styles.mb4]}>
          <Text style={[fs_12_400, text_black]}>Được giao:</Text>
          <Text style={[fs_12_400, text_black]}>30/100</Text>
        </View>

        <View style={[styles.row_between_chart]}>
          <Text style={[fs_12_400, text_black]}>Thực hiện:</Text>
          <CircleProgressChart total={22} progress={15} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  blockItem: {
    width: '48%',
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
    padding: 8,
    height: 'auto',
  },
  row_gap3: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  mb4: {
    marginBottom: 4,
  },
  row_between_chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
