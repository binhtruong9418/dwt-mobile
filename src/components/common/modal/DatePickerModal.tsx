import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  fs_14_700,
  text_black,
  text_center,
  text_red,
} from '../../../assets/style.ts';
import DateTimePicker from 'react-native-ui-datepicker';
import CloseIcon from '../../../assets/img/close-icon.svg';
import {useState} from 'react';
import 'dayjs/locale/vi';
import PrimaryButton from '../button/PrimaryButton.tsx';
import {ReactNativeModal} from 'react-native-modal';
import dayjs from 'dayjs';

export default function DatePickerModal({
  setVisible,
  visible,
  currentDate,
  setCurrentDate,
}: any) {
  const [dateSelect, setDateSelect] = useState(currentDate || dayjs());

  const handleSaveValue = () => {
    setCurrentDate(dateSelect);
    setVisible(false);
  };

  return (
    <ReactNativeModal
      animationInTiming={200}
      animationOutTiming={200}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      swipeDirection={'down'}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onSwipeComplete={() => {
        setVisible(false);
      }}
      style={styles.wrapper}
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[fs_14_700, text_red, text_center]}>CHỌN THỜI GIAN</Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              setVisible(false);
            }}>
            <CloseIcon width={20} height={20} style={styles.closeIcon} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.calendar}>
            <DateTimePicker
              value={dateSelect}
              onValueChange={(date: any) => {
                setDateSelect(dayjs(date, 'YYYY-MM-DD HH:mm'));
              }}
              locale={'vi'}
              mode={'date'}
              firstDayOfWeek={1}
              selectedItemColor={'#CA1F24'}
              weekDaysTextStyle={styles.weekDayTextStyle}
              calendarTextStyle={styles.dayTextStyle}
              headerTextStyle={styles.headerTextStyle}
            />
          </View>
          <PrimaryButton
            onPress={handleSaveValue}
            text={'Áp dụng'}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.75)',
    justifyContent: 'center',
    margin: 0,
  },
  header: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    position: 'relative',
  },
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 15,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  content: {
    paddingHorizontal: 15,
  },
  row_gap10: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  calendar: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  weekDayTextStyle: {
    fontSize: 10,
    color: '#8F9098',
    fontWeight: '600',
  },
  dayTextStyle: {
    fontSize: 12,
    color: '#000',
    fontWeight: '700',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  headerTextStyle: {
    ...fs_14_700,
    ...text_black,
  },
});
