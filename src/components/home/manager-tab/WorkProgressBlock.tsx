import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  fs_10_400,
  fs_10_500,
  fs_12_400,
  fs_12_500,
  mt10,
  row_between,
  text_black,
  text_center,
  text_red,
  text_white,
  w_full,
} from '../../../assets/style';
import CalendarIcon from '../../../assets/img/calendar-icon.svg';
import ClockIcon from '../../../assets/img/clock-icon.svg';
import ClockOtIcon from '../../../assets/img/clock-ot-icon.svg';
import MeetingIcon from '../../../assets/img/meeting-icon.svg';
import CircleProgressChart from './../CircleProgressChart';
import PropTypes, {InferProps} from 'prop-types';
import {padStart} from '../../../utils';

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
            {padStart(Number(attendanceData.countLate).toFixed(0), 2, '0')}
          </Text>
        </View>

        <View style={[styles.row, w_full, styles.mb4]}>
          <View style={[styles.row_gap3, {width: '80%'}]}>
            <ClockOtIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Dự kiến bù - tăng ca</Text>
          </View>
          <Text style={[fs_12_400, text_red]}>
            {padStart(Number(attendanceData.expectedOT).toFixed(0), 2, '0')}
          </Text>
        </View>

        <View style={[row_between]}>
          <View style={styles.row_gap3}>
            <MeetingIcon width={16} height={16} />
            <Text style={[fs_12_400, text_black]}>Giao ban</Text>
          </View>
          <Text style={[fs_12_400, text_black]}>
            {padStart(Number(attendanceData.countLate).toFixed(0), 2, '0')}
          </Text>
        </View>
      </View>

      <View style={styles.blockItem}>
        <Text style={[fs_12_500, text_red, text_center, styles.mb4]}>
          Lượng việc (điểm)
        </Text>
        <View style={styles.row_chart}>
          <View style={[styles.col_chart, {alignItems: 'center'}]}>
            <View style={{height: 60, justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 3,
                  backgroundColor: '#C02626',
                  width: '100%',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                }}>
                <Text style={[fs_10_500, text_white, text_center]}>
                  Báo cáo ngày
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[fs_10_500, text_black, text_center]}>
              Cá nhân/Phòng
            </Text>
          </View>
          <View style={[styles.col_chart, {alignItems: 'center'}]}>
            <CircleProgressChart
              progress={Number(workPersonalData.tmpTotalKPI)}
              total={Number(workDepartmentData.tmpTotalKPI)}
            />

            <Text style={[fs_10_500, text_black, text_center]}>
              {workPersonalData.tmpTotalKPI}/{workDepartmentData.tmpTotalKPI}{' '}
              nhiệm vụ
            </Text>
          </View>
        </View>
        <View style={[row_between, {width: '100%'}]} />
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
    borderRadius: 6,
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
    gap: 5,
  },
  mb4: {
    marginBottom: 6,
  },
  col_chart: {
    flexDirection: 'column',
    width: '50%',
    gap: 5,
    height: 80,
    justifyContent: 'space-between',
  },
});

WorkProgressBlock.propTypes = {
  attendanceData: PropTypes.any,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  workPersonalData: PropTypes.any,
  workDepartmentData: PropTypes.any,
};
