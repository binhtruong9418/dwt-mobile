import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fs_13_400,
  fs_13_700,
  text_black,
  text_center,
} from '../../../assets/style.ts';
import {useNavigation} from '@react-navigation/native';

export default function RowDetail({}) {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>Tên nhiệm vụ:</Text>
        <Text style={[fs_13_400, text_black, styles.value]}>Báo cáo</Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>ĐVT:</Text>
        <Text style={[fs_13_400, text_black, styles.value]}>Báo cáo</Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>Chỉ tiêu:</Text>
        <Text style={[fs_13_400, text_black, styles.value]}>5</Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>
          Đã hoàn thành:
        </Text>
        <Text style={[fs_13_400, text_black, styles.value]}>2</Text>
      </View>

      <View style={styles.row}>
        <Text style={[fs_13_700, text_black, styles.title]}>
          Định mức (giờ):
        </Text>
        <Text style={[fs_13_400, text_black, styles.value]}>40</Text>
      </View>

      <View style={styles.listButton}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('WorkDetail', {});
          }}>
          <Text style={[fs_13_400, text_black]}>Xem chi tiết</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('WorkReport', {});
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
  leftButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#D9D9D9',
    borderRightWidth: 0.5,
    paddingVertical: 7,
  },
  rightButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#D9D9D9',
    borderLeftWidth: 0.5,
    paddingVertical: 7,
  },
});
