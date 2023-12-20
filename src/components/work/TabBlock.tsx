import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {
  fs_14_400,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';

export default function TabBlock({}) {
  const [activeTab, setActiveTab] = useState('Key');
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.item, activeTab === 'Key' && styles.item_active]}
        onPress={() => {
          setActiveTab('Key');
        }}>
        <Text
          style={[
            fs_14_400,
            text_center,
            activeTab === 'Key' ? text_red : text_black,
          ]}>
          {'Key'}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={[styles.item, activeTab === 'NonKey' && styles.item_active]}
        onPress={() => {
          setActiveTab('NonKey');
        }}>
        <Text
          style={[
            fs_14_400,
            text_center,
            activeTab === 'NonKey' ? text_red : text_black,
          ]}>
          {'NonKey'}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={[styles.item, activeTab === 'Phát sinh' && styles.item_active]}
        onPress={() => {
          setActiveTab('Phát sinh');
        }}>
        <Text
          style={[
            fs_14_400,
            text_center,
            activeTab === 'Phát sinh' ? text_red : text_black,
          ]}>
          {'Phát sinh'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  item: {
    flex: 1 / 3,
    paddingVertical: 10,
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
