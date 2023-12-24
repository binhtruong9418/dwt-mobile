import {View, StyleSheet, Text} from 'react-native';
import {
  fs_12_400,
  fs_12_500,
  mt10,
  row_between,
  text_black,
  text_center,
  text_red,
  w_full,
} from '../../assets/style';
import CalendarIcon from '../../assets/img/calendar-icon.svg';
import ClockIcon from '../../assets/img/clock-icon.svg';
import ClockOtIcon from '../../assets/img/clock-ot-icon.svg';
import CircleProgressChart from './CircleProgressChart';
import PropTypes, {InferProps} from 'prop-types';
import {padStart} from '../../utils';
export default function WorkProgressBlock({
  checkIn,
  checkOut,
  attendanceData,
  workPersonalData,
  workDepartmentData,
}: InferProps<typeof WorkProgressBlock.propTypes>) {
  const formatCheckIn = checkIn ? checkIn.slice(0, 5) : '--:--';
  const formatCheckOut = checkOut ? checkOut.slice(0, 5) : '--:--';
  return (
    <View style={styles.wrapper}>
      <View style={styles.blockItem}>
        <View style={[row_between, styles.mb4]}>
          <View style={styles.row_gap3}>
            <ClockIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Ngày công</Text>
          </View>
          <Text style={[fs_12_400, text_black]}>
            {attendanceData.calcDaysWork}/{attendanceData.allDaysWork}
          </Text>
        </View>

        <View style={[row_between, styles.mb4]}>
          <View style={styles.row_gap3}>
            <CalendarIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Đã nghỉ / vắng</Text>
          </View>
          <Text style={[fs_12_400, text_black]}>
            {padStart(attendanceData.countLate, 2, '0')}
          </Text>
        </View>

        <View style={[styles.row, styles.mb4, w_full]}>
          <View style={[styles.row_gap3, {width: '80%'}]}>
            <ClockOtIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Dự kiến bù - tăng ca</Text>
          </View>
          <Text style={[fs_12_400, text_red]}>{attendanceData.expectedOT}</Text>
        </View>

        <Text style={[fs_12_500, text_red, text_center, mt10]}>
          Vào: {formatCheckIn} - Ra: {formatCheckOut}
        </Text>
      </View>

      <View style={styles.blockItem}>
        <Text style={[fs_12_500, text_red, text_center]}>Lượng việc</Text>
        <View style={[styles.col_chart]}>
          <Text style={[fs_12_400, text_black]}>Cá nhân/Phòng</Text>
          <CircleProgressChart
            progress={Number(workPersonalData.tmpTotalKPI)}
            total={Number(workDepartmentData.tmpTotalKPI)}
          />
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
  row: {
    flexDirection: 'row',
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
  },
  row_chart: {
    flexDirection: 'row',
    flex: 1,
  },
  mb4: {
    marginBottom: 4,
  },
  col_chart: {
    flexDirection: 'column',
    flex: 0.5,
    alignItems: 'center',
    gap: 5,
  },
});

WorkProgressBlock.propTypes = {
  attendanceData: PropTypes.any,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  workPersonalData: PropTypes.any,
  workDepartmentData: PropTypes.any,
};
