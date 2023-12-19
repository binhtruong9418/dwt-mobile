import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  fs_10_400,
  fs_12_400,
  fs_12_500,
  fs_13_500,
  fs_15_500,
  fs_15_700,
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
      <Text style={[fs_13_500, text_red, text_center]}>
        TIẾN ĐỘ CÔNG VIỆC THÁNG NÀY
      </Text>
      <View style={styles.row_center}>
        <View style={styles.box}>
          <Text style={[fs_12_400, text_black]}>Số khách hàng</Text>
          <Text style={[fs_15_700, text_black]}>120</Text>
          <Text style={[fs_10_400, text_light_gray]}>so với tháng trước</Text>
          <View style={styles.row_center_text}>
            <GrowUpIcon width={10} height={10} />
            <Text style={[fs_10_400, text_green]}>33,70%</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={[fs_12_400, text_black]}>Doanh số</Text>
          <Text style={[fs_15_700, text_black]}>50.000.000</Text>
          <Text style={[fs_10_400, text_light_gray]}>so với tháng trước</Text>
          <View style={styles.row_center_text}>
            <GrowUpIcon width={10} height={10} />
            <Text style={[fs_10_400, text_green]}>33,70%</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={[fs_12_400, text_black]}>Hoàn thành công việc</Text>
          <Text style={[fs_15_700, text_black]}>50%</Text>
          <Text style={[fs_10_400, text_light_gray]}>so với tháng trước</Text>
          <View style={styles.row_center_text}>
            <GrowUpIcon width={10} height={10} />
            <Text style={[fs_10_400, text_green]}>33,70%</Text>
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
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 12,
  },
  row_center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  row_center_text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderRadius: 10,
    borderColor: '#817C7C',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    width: '31%',
    height: 'auto',
  },
});
