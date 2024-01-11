import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {getDaysInMonth} from '../../utils';
import PropTypes, {InferProps} from 'prop-types';
import dayjs from 'dayjs';
import {useRef} from "react";

export default function DailyMeetingCalendar(
    {
        currentDate,
        setCurrentDate,
        listMeeting
    }: InferProps<typeof DailyMeetingCalendar.propTypes>) {
    const haveLog = (item: any) => {
        return listMeeting.find(
            (meeting: any, index: number) => {
                return meeting?.start_time.split(' ')[0] ===
                    dayjs().month(currentDate?.month).year(currentDate?.year)
                        .date(item?.date).format('YYYY-MM-DD')
            }
        );
    }

    return (
        <View>
            <FlatList
                contentContainerStyle={{
                    paddingBottom: 10,
                }}
                style={{
                    borderBottomColor: '#D0D0D0',
                    borderBottomWidth: 1,
                }}
                initialScrollIndex={currentDate.date - 1}
                getItemLayout={(data, index) => {
                    return { length: 45, offset: index * 45, index };
                }}
                initialNumToRender={dayjs().daysInMonth()}
                showsHorizontalScrollIndicator={false}
                data={getDaysInMonth(currentDate.month, currentDate.year)}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{width: 10}}/>}
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
                            }
                        >
                            <Text style={styles.day}>
                                {item.day !== 0 ? 'Thứ ' + (item.day + 1) : 'CN'}
                            </Text>
                            <Text style={styles.date}>{item.date}</Text>
                            {
                                // Show mark if current date has report
                                haveLog(item) && <View style={styles.marked}/>
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
        fontSize: 12,
        fontWeight: '500',
        color: '#3C3C434D',
        marginBottom: 5,
    },
    date: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 4,
        color: '#111',
    },
    selectedDate: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4,
    },
    marked: {
        backgroundColor: '#D20019',
        borderRadius: 999,
        width: 8,
        height: 8,
    },
});

DailyMeetingCalendar.propTypes = {
    currentDate: PropTypes.shape({
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
    }).isRequired,
    setCurrentDate: PropTypes.func.isRequired,
    listMeeting: PropTypes.array.isRequired,
};
