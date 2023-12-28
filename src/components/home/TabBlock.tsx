import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fs_14_400,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';

export default function TabBlock({
  currentTab,
  setCurrentTab,
}: InferProps<typeof TabBlock.propTypes>) {
  return (
    <View>
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{height: 40}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.item, currentTab === 0 && styles.item_active]}
          onPress={() => {
            setCurrentTab(0);
          }}>
          <Text
            style={[
              fs_14_400,
              text_center,
              currentTab === 0 ? text_red : text_black,
            ]}>
            {'Nhật trình'}
          </Text>
        </TouchableOpacity>

        {/*<View style={styles.divider} />*/}

        <TouchableOpacity
          style={[styles.item, currentTab === 2 && styles.item_active]}
          onPress={() => {
            setCurrentTab(2);
          }}>
          <Text
            style={[
              fs_14_400,
              text_center,
              currentTab === 2 ? text_red : text_black,
            ]}>
            {'Kinh doanh'}
          </Text>
        </TouchableOpacity>

        {/*<View style={styles.divider} />*/}

        <TouchableOpacity
          style={[styles.item, currentTab === 3 && styles.item_active]}
          onPress={() => {
            setCurrentTab(3);
          }}>
          <Text
            style={[
              fs_14_400,
              text_center,
              currentTab === 3 ? text_red : text_black,
            ]}>
            {'Sản xuất'}
          </Text>
        </TouchableOpacity>

        {/*<View style={styles.divider} />*/}

        <TouchableOpacity
          style={[styles.item, currentTab === 4 && styles.item_active]}
          onPress={() => {
            setCurrentTab(4);
          }}>
          <Text
            style={[
              fs_14_400,
              text_center,
              currentTab === 4 ? text_red : text_black,
            ]}>
            {'Kho vận'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, currentTab === 4 && styles.item_active]}
          onPress={() => {
            setCurrentTab(4);
          }}>
          <Text
            style={[
              fs_14_400,
              text_center,
              currentTab === 5 ? text_red : text_black,
            ]}>
            {'HCNS'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
  },
  item: {
    width: 90,
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  item_active: {
    borderBottomWidth: 3,
    borderBottomColor: '#D20019',
  },
});

TabBlock.propTypes = {
  currentTab: PropTypes.number.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};
