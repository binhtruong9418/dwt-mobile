import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  fs_10_400,
  fs_12_400,
  fs_12_500,
  fs_13_500,
  fs_14_500,
  fs_15_500,
  fs_15_700,
  fs_20_700,
  text_black,
  text_center,
  text_green,
  text_light_gray,
  text_red,
} from '../../assets/style.ts';
import GrowUpIcon from '../../assets/img/growup.svg';

export default function ProgressBlock({}) {
  return (
    <View style={styles.wrapper}>
      <Text style={[fs_14_500, text_red, text_center]}>TUẦN NÀY</Text>
      <View style={styles.row_item}>
        <View style={[styles.box, styles.pending_bg]}>
          <Text style={[fs_10_400, text_black, text_center]}>
            Số việc được giao
          </Text>
          <Text style={[fs_20_700, text_black, text_center]}>30</Text>
        </View>

        <View style={[styles.box, styles.success_bg]}>
          <Text style={[fs_10_400, text_black, text_center]}>
            Số việc hoàn thành
          </Text>
          <Text style={[fs_20_700, text_black, text_center]}>10</Text>
        </View>

        <View style={[styles.box, styles.late_bg]}>
          <Text style={[fs_10_400, text_black, text_center]}>
            Số việc đang trễ
          </Text>
          <Text style={[fs_20_700, text_black, text_center]}>2</Text>
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
    padding: 8,
  },
  box: {
    borderRadius: 10,
    borderColor: '#817C7C',
    borderWidth: 1,
    padding: 5,
    height: 'auto',
    flex: 0.3,
  },
  row_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flex: 1,
  },
  pending_bg: {
    backgroundColor: '#FAF5D3',
  },
  success_bg: {
    backgroundColor: '#CCF4D3',
  },
  late_bg: {
    backgroundColor: '#FCEDEC',
  },
});
