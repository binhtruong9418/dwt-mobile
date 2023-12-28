import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDaysInMonth} from '../../utils';
import PropTypes, {InferProps} from 'prop-types';

export default function DailyCalendar({
  currentDate,
  setCurrentDate,
}: InferProps<typeof DailyCalendar.propTypes>) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{
          borderBottomColor: '#D0D0D0',
          borderBottomWidth: 1,
        }}
        showsHorizontalScrollIndicator={false}
        data={getDaysInMonth(currentDate.month, currentDate.year)}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setCurrentDate({
                  ...currentDate,
                  date: item.date,
                });
              }}
              style={
                currentDate.date === item.date
                  ? styles.selectedItem
                  : styles.item
              }>
              <Text style={styles.day}>
                {item.day !== 0 ? 'Thứ ' + (item.day + 1) : 'CN'}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
              {
                // Show mark if the date is today
                currentDate.date === item.date && <View style={styles.marked} />
              }
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 45,
    height: 70,
    paddingTop: 3,
    alignItems: 'center',
  },
  selectedItem: {
    width: 45,
    height: 70,
    borderRadius: 16,
    borderColor: '#D20019',
    paddingTop: 3,
    borderWidth: 1,
    alignItems: 'center',
  },
  day: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#3C3C434D',
    marginBottom: 5,
  },
  date: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 4,
  },
  selectedDate: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 4,
  },
  marked: {
    backgroundColor: '#D20019',
    borderRadius: 999,
    width: 8,
    height: 8,
  },
});

DailyCalendar.propTypes = {
  currentDate: PropTypes.shape({
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired,
  setCurrentDate: PropTypes.func.isRequired,
};
