import {
  Pressable,
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {fs_14_700, text_red, text_white} from '../../assets/style.ts';

export default function AdminTabBlock({currentTab, setCurrentTab}: any) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.toggleContainer]}>
        <Pressable
          onPress={() => {
            setCurrentTab(0);
          }}
          style={[
            styles.toggleCircle,
            {borderTopEndRadius: 50, borderBottomEndRadius: 50, flex: 0.5},
            currentTab === 0 && styles.selected,
          ]}>
          <Text style={[fs_14_700, currentTab === 0 ? text_red : text_white]}>
            CÁ NHÂN
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setCurrentTab(1);
          }}
          style={[
            styles.toggleCircle,
            {
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
              borderTopEndRadius: 50,
              borderBottomEndRadius: 50,
              flex: 0.5,
            },
            currentTab === 1 && styles.selected,
          ]}>
          <Text style={[fs_14_700, currentTab === 1 ? text_red : text_white]}>
            ĐƠN VỊ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DD0013',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleContainer: {
    width: '50%',
    borderRadius: 50,
    backgroundColor: 'rgba(175, 42, 53, 0.68)',
    padding: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    flex: 1,
  },
  toggleCircle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#fff',
  },
});
