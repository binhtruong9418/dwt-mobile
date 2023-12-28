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
        <TouchableOpacity
          onPress={() => {
            setCurrentTab(0);
          }}
          style={[styles.toggleCircle, currentTab === 0 && styles.selected]}>
          <Text style={[fs_14_700, currentTab === 0 ? text_red : text_white]}>
            CÁ NHÂN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentTab(1);
          }}
          style={[styles.toggleCircle, currentTab === 1 && styles.selected]}>
          <Text style={[fs_14_700, currentTab === 1 ? text_red : text_white]}>
            ĐƠN VỊ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DD0013',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    height: 60,
  },
  toggleContainer: {
    width: '50%',
    borderRadius: 50,
    backgroundColor: 'rgba(175, 42, 53, 0.68)',
    padding: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 'auto',
    flex: 1,
  },
  toggleCircle: {
    borderRadius: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  selected: {
    backgroundColor: '#fff',
  },
});
