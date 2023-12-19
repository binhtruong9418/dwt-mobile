import {View, StyleSheet, Text} from 'react-native';
import {fs_12_500, text_black, text_center, text_red} from '../../assets/style';
import CalendarInIcon from '../../assets/img/calendar-in.svg';
import CheckoutIcon from '../../assets/img/check-out.svg';
import CircleProgressChart from './CircleProgressChart';
export default function SummaryBlock({}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.blockItem}>
        <Text style={[fs_12_500, text_red, text_center]}>HÔM NAY</Text>
        <View style={[styles.rowItem, styles.mt5]}>
          <View style={styles.row_gap_5}>
            <CalendarInIcon width={20} height={20} />
            <Text style={[fs_12_500, text_black, text_center]}>Giờ vào</Text>
          </View>
          <Text style={[fs_12_500, text_black, text_center]}>8:00</Text>
        </View>

        <View style={[styles.rowItem, styles.mt8]}>
          <View style={styles.row_gap_5}>
            <CheckoutIcon width={20} height={20} />
            <Text style={[fs_12_500, text_black, text_center]}>Giờ ra</Text>
          </View>
          <Text style={[fs_12_500, text_black, text_center]}>17:05</Text>
        </View>
      </View>

      <View style={styles.blockItem}>
        <Text style={[fs_12_500, text_red, text_center]}>HÔM NAY</Text>
        <View style={styles.col_center}>
          <CircleProgressChart progress={15} total={22} />
          <Text style={[fs_12_500, text_black, text_center, styles.mt3]}>
            1 lần đi muộn
          </Text>
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
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 10,
    height: 'auto',
  },
  gap10: {
    gap: 10,
  },
  mt8: {
    marginTop: 8,
  },
  mt5: {
    marginTop: 5,
  },
  mt3: {
    marginTop: 3,
  },
  rowItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row_gap_5: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  col_center: {
    alignItems: 'center',
    paddingTop: 2,
  },
});
