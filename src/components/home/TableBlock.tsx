import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  bg_green,
  bg_red,
  bg_yellow,
  fs_8_700,
  text_center,
  text_white,
} from '../../assets/style.ts';
export default function TableBlock({}) {
  return <View style={styles.wrapper} />;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
  },
  chartItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
});
