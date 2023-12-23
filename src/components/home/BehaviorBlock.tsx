import {StyleSheet, Text, View} from 'react-native';
import {
  bg_green,
  bg_red,
  bg_yellow,
  fs_8_700,
  text_center,
  text_white,
} from '../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';
import {useMemo} from 'react';
export default function BehaviorBlock({
  rewardAndPunishData,
}: InferProps<typeof BehaviorBlock.propTypes>) {
  const totalRewardAndPunish = useMemo(() => {
    return (
      rewardAndPunishData.rewardsTotal +
      rewardAndPunishData.punishmentTotal +
      rewardAndPunishData.reminderTotal
    );
  }, [rewardAndPunishData]);
  return (
    <View style={styles.wrapper}>
      {/*<View style={styles.chart}>*/}
      {/*  <View*/}
      {/*    style={[*/}
      {/*      bg_green,*/}
      {/*      styles.chartItem,*/}
      {/*      {flex: rewardAndPunishData / 100},*/}
      {/*    ]}>*/}
      {/*    <Text style={[fs_8_700, text_white, text_center]}>*/}
      {/*      {testData1[0]} HT*/}
      {/*    </Text>*/}
      {/*  </View>*/}

      {/*  <View*/}
      {/*    style={[*/}
      {/*      bg_yellow,*/}
      {/*      styles.chartItem,*/}
      {/*      {flex: testData1[1] / totalRewardAndPunish},*/}
      {/*    ]}>*/}
      {/*    <Text style={[fs_8_700, text_white, text_center]}>*/}
      {/*      {testData1[1]} HT*/}
      {/*    </Text>*/}
      {/*  </View>*/}

      {/*  <View style={[bg_red, styles.chartItem, {flex: testData1[2] / 100}]}>*/}
      {/*    <Text style={[fs_8_700, text_white, text_center]}>*/}
      {/*      {testData1[2]} HT*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*</View>*/}

      <View style={styles.chart}>
        <View
          style={[
            bg_green,
            styles.chartItem,
            {
              flex: rewardAndPunishData.rewardsTotal / totalRewardAndPunish,
            },
          ]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            Khen: {rewardAndPunishData.rewardsTotal}
          </Text>
        </View>

        <View
          style={[
            bg_yellow,
            styles.chartItem,
            {
              flex: rewardAndPunishData.reminderTotal / totalRewardAndPunish,
            },
          ]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            Sự cố: {rewardAndPunishData.reminderTotal}
          </Text>
        </View>

        <View
          style={[
            bg_red,
            styles.chartItem,
            {flex: rewardAndPunishData.punishmentTotal / totalRewardAndPunish},
          ]}>
          <Text style={[fs_8_700, text_white, text_center]}>
            Vi phạm: {rewardAndPunishData.punishmentTotal}
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

BehaviorBlock.propTypes = {
  rewardAndPunishData: PropTypes.any,
};
