import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fs_13_400,
  fs_13_700,
  text_black,
  text_center,
} from '../../../assets/style.ts';
import {useNavigation} from '@react-navigation/native';

export default function RowDetail({data, isWorkArise}: any) {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>Tên nhiệm vụ:</Text>
        <Text style={[fs_13_400, text_black, styles.value]}>{data.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>ĐVT:</Text>
        <Text style={[fs_13_400, text_black, styles.value]}>
          {data.unit_name}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>Chỉ tiêu:</Text>
        <Text style={[fs_13_400, text_black, styles.value]}>
          {data.totalTarget}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>
          Đã hoàn thành:
        </Text>
        <Text style={[fs_13_400, text_black, styles.value]}>
          {data.totalComplete}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>
          Định mức (giờ):
        </Text>
        <Text style={[fs_13_400, text_black, styles.value]}>
          {data.working_hours}
        </Text>
      </View>

      <View style={styles.listButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('WorkListReport', {
              data: data,
            });
          }}>
          <Text style={[fs_13_400, text_black]}>Tiến trình</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('WorkDetail', {
              data: data,
            });
          }}>
          <Text style={[fs_13_400, text_black]}>Xem chi tiết</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('WorkReport', {
              data: data,
              isWorkArise: isWorkArise,
            });
          }}>
          <Text style={[fs_13_400, text_black]}>Báo cáo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderLeftColor: '#D9D9D9',
    borderLeftWidth: 1,
    borderRightColor: '#D9D9D9',
    borderRightWidth: 1,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
  },
  title: {
    width: '40%',
  },
  value: {
    width: '60%',
  },
  listButton: {
    flexDirection: 'row',
    flex: 1,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  button: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#D9D9D9',
    borderLeftWidth: 0.5,
    borderRightColor: '#D9D9D9',
    borderRightWidth: 0.5,
    paddingVertical: 7,
  },
});
