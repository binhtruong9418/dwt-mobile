import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fs_12_400,
  fs_13_500,
  fs_15_700,
  text_black,
  text_red,
} from '../../assets/style.ts';

export default function TargetBlock({}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.col_center}>
        <Text style={[fs_13_500, text_red]}>MỤC TIÊU THÁNG</Text>
        <Text style={[fs_15_700, text_black]}>100.000.000</Text>
      </View>
      <View style={styles.row_center}>
        <TouchableOpacity style={styles.button}>
          <Text style={[fs_12_400, text_black]}>XIN NGHỈ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={[fs_12_400, text_black]}>BÁO CÁO</Text>
        </TouchableOpacity>
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
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingLeft: 15,
    paddingVertical: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col_center: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row_center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: 'rgba(217, 217, 217, 0.00)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DD0013',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
