import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LIST_MENU} from '../../assets/constant.tsx';
import {fs_10_700, text_center, text_red} from '../../assets/style.ts';
import {useState} from 'react';

export default function MenuBlock({}) {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  return (
    <View
      style={styles.wrapper}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
      <FlatList
        data={LIST_MENU}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.box,
              {
                height: (containerWidth - 76) / 4,
                width: (containerWidth - 76) / 4,
              },
            ]}>
            {item.icon}
            <Text style={[fs_10_700, text_red, text_center]}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={4}
        columnWrapperStyle={styles.columnStyle}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  box: {
    backgroundColor: '#FFF',
    borderColor: '#E4E5E7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    gap: 4,
  },
  columnStyle: {
    flex: 1,
    columnGap: 12,
  },
});
