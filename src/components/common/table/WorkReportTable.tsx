import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  fs_12_400,
  fs_12_500,
  fs_12_700,
  text_black,
  text_center,
} from '../../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';

export default function WorkReportTable({
  columns,
  data,
}: InferProps<typeof WorkReportTable.propTypes>) {
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
                  backgroundColor: '#FFF',
                  height: 'auto',
                },
                styles.cell,
              ]}>
              <Text style={[fs_12_700, text_black, text_center]}>
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
          return (
            <View style={[styles.row]}>
              {columns.map((column: any, index: any) => {
                return (
                  <View
                    key={index}
                    style={[
                      {
                        flex: column.width,
                        backgroundColor: '#FFF',
                        height: 'auto',
                      },
                      styles.cell,
                    ]}>
                    <Text style={[fs_12_400, text_black, text_center]}>
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
    paddingVertical: 7,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
});

WorkReportTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  canShowMore: PropTypes.bool,
};
