import {FlatList, StyleSheet, Text, View} from 'react-native';
import {fs_12_500, text_black, text_center} from '../../../assets/style.ts';

export default function PrimaryTable({columns, data}: any) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {columns.map((column: any, index: any) => {
          return (
            <View
              key={index}
              style={[
                {
                  flex: column.width,
                  backgroundColor: '#DCE1E7',
                  height: 'auto',
                },
                styles.cell,
                index !== 0 && styles.borderLeft,
              ]}>
              <Text style={[fs_12_500, text_black, text_center]}>
                {column.title}
              </Text>
            </View>
          );
        })}
      </View>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({item}) => {
          let bgColor = item.bgColor || '#FFF';
          let textColor = item.textColor || '#000';
          delete item.bgColor;
          delete item.textColor;
          return (
            <View style={[styles.row, styles.borderTop]}>
              {columns.map((column: any, index: any) => {
                return (
                  <View
                    key={index}
                    style={[
                      {
                        flex: column.width,
                        backgroundColor: bgColor,
                        height: 'auto',
                      },
                      styles.cell,
                      index !== 0 && styles.borderLeft,
                    ]}>
                    <Text style={[fs_12_500, {color: textColor}, text_center]}>
                      {item[column.key]}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    paddingVertical: 6,
    justifyContent: 'center',
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.50)',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.50)',
  },
});
