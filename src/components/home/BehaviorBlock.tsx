import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  bg_green,
  bg_red,
  bg_yellow,
  fs_8_700,
  text_center,
  text_white,
} from '../../assets/style.ts';
export default function BehaviorBlock({}) {
  const testData1 = [74, 18, 8];

  const testData2 = [15, 15, 35];
  return (
    <View style={styles.wrapper}>
      <View style={styles.chart}>
        <View style={[bg_green, styles.chartItem, {flex: testData1[0] / 100}]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            {testData1[0]} HT
          </Text>
        </View>

        <View style={[bg_yellow, styles.chartItem, {flex: testData1[1] / 100}]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            {testData1[1]} HT
          </Text>
        </View>

        <View style={[bg_red, styles.chartItem, {flex: testData1[2] / 100}]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            {testData1[2]} HT
          </Text>
        </View>
      </View>

      <View style={styles.chart}>
        <View style={[bg_green, styles.chartItem, {flex: testData2[0] / 65}]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            Khen: {testData2[0]}
          </Text>
        </View>

        <View style={[bg_yellow, styles.chartItem, {flex: testData2[1] / 65}]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            Sự cố: {testData2[1]}
          </Text>
        </View>

        <View style={[bg_red, styles.chartItem, {flex: testData2[2] / 65}]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            Vi phạm: {testData2[2]}
          </Text>
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
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 7,
    gap: 10,
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
