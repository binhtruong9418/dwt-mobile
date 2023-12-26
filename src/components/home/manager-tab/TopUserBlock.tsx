import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  fs_12_400,
  fs_12_500,
  fs_13_700,
  text_black,
  text_center,
} from '../../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';

const columns = [
  {
    key: 'index',
    title: 'TT',
    width: 0.1,
  },
  {
    key: 'name',
    title: 'Tên',
    width: 0.35,
  },
  {
    key: 'position',
    title: 'Vị trí',
    width: 0.35,
  },
  {
    key: 'business_standard_score_tmp',
    title: 'NS/KPI',
    width: 0.2,
  },
];
const data = [
  {
    index: 1,
    name: 'Nguyễn Văn A',
    position: 'Nhân viên',
    business_standard_score_tmp: 100,
  },
  {
    index: 2,
    name: 'Nguyễn Văn B',
    position: 'Nhân viên',
    business_standard_score_tmp: 100,
  },
  {
    index: 3,
    name: 'Nguyễn Văn C',
    position: 'Nhân viên',
    business_standard_score_tmp: 100,
  },
  {
    index: 4,
    name: 'Nguyễn Văn D',
    position: 'Nhân viên',
    business_standard_score_tmp: 100,
  },
  {
    index: 5,
    name: 'Nguyễn Văn E',
    position: 'Nhân viên',
    business_standard_score_tmp: 100,
  },
];

export default function TopUserBlock() {
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: '#F9CCCC',
        }}>
        <Text style={[fs_13_700, text_center, text_black]}>
          Xếp hạng nhân viên
        </Text>
      </View>
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
        renderItem={({item}: any) => {
          return (
            <View
              style={[
                styles.row,
                {
                  borderTopColor: '#DCE1E7',
                  borderTopWidth: 1,
                },
              ]}>
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
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    paddingVertical: 8,
    justifyContent: 'center',
  },
});

// TopUserBlock.propTypes = {
//   columns: PropTypes.array.isRequired,
//   data: PropTypes.array.isRequired,
// };
