import {StyleSheet, Text, View} from 'react-native';
import {
  fs_10_500,
  fs_12_400,
  text_black,
  text_center,
  text_white,
} from '../../assets/style.ts';
import {backgroundColor} from 'react-native-calendars/src/style';

export default function PersonalReportDetail({}) {
  const text = 'Cắt uốn 19 bộ khung chính. 35 bộ khung bao xe XDD 600 N';
  return (
    <View style={styles.wrapper}>
      <View style={[styles.timeBox, {backgroundColor: '#C02626'}]}>
        <Text style={[fs_10_500, text_white, text_center]}>Hôm nay</Text>
      </View>
      <Text style={[fs_12_400, text_black]}>• {text}</Text>
      <Text style={[fs_12_400, text_black]}>• {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 10,
  },
  timeBox: {
    position: 'absolute',
    left: 15,
    top: -8,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});
