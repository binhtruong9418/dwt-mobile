import {FlatList, StyleSheet, Text, View} from 'react-native';
import {fs_12_500, text_black, text_center} from '../../../assets/style.ts';
import RowTable from './RowTable.tsx';
import PropTypes, {InferProps} from 'prop-types';

export default function PrimaryTable({
  columns,
  data,
  canShowMore,
}: InferProps<typeof PrimaryTable.propTypes>) {
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
          const newItem = {...item};
          delete newItem.bgColor;
          return (
            <RowTable
              item={newItem}
              columns={columns}
              bgColor={bgColor}
              canShowMore={canShowMore}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        contentContainerStyle={{marginTop: 5}}
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
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.50)',
  },
});

PrimaryTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  canShowMore: PropTypes.bool,
};

PrimaryTable.defaultProps = {
  canShowMore: false,
};
