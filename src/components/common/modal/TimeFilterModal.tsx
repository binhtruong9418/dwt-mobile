import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes, {InferProps} from 'prop-types';
import {ReactNativeModal} from 'react-native-modal';
import {
  fs_14_400,
  fs_14_700,
  text_black,
  text_center,
  text_red,
} from '../../../assets/style.ts';
import CloseIcon from '../../../assets/img/close-icon.svg';
import PrimaryCheckbox from '../checkbox/PrimaryCheckbox.tsx';
import {useState} from 'react';
import PrimaryButton from '../button/PrimaryButton.tsx';
import DatePickerModal from './DatePickerModal.tsx';
import ChevronRightIcon from '../../../assets/img/chevron-right.svg';
import dayjs from 'dayjs';
import {LIST_TIME_FILTER} from '../../../assets/constant.ts';
export default function TimeFilterModal({
  visible,
  setVisible,
  setTimeValue,
  timeCustomValue,
  setTimeCustomValue,
}: InferProps<typeof TimeFilterModal.propTypes>) {
  const [currentFilter, setCurrentFilter] = useState(LIST_TIME_FILTER[0].value);
  const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
  const [customTime, setCustomTime] = useState<any>(timeCustomValue);
  const handleChangeCheck = (value: string) => {
    if (value === 'custom' && !customTime.fromDate && !customTime.toDate) {
      setIsOpenTimePicker(true);
    } else {
      setCurrentFilter(value);
    }
  };

  const handleSaveCustomValue = () => {
    setCurrentFilter('custom');
    setIsOpenTimePicker(false);
  };

  const handleSaveValue = () => {
    setTimeValue(LIST_TIME_FILTER.find(item => item.value === currentFilter));
    if (currentFilter === 'custom') {
      setTimeCustomValue(customTime);
    }
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
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[fs_14_700, text_red, text_center]}>LỌC THỜI GIAN</Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              setVisible(false);
            }}>
            <CloseIcon width={20} height={20} style={styles.closeIcon} />
          </Pressable>
        </View>

        <View style={styles.row_container}>
          {LIST_TIME_FILTER.map((item, index) => (
            <View style={[styles.row_item]} key={index}>
              <View>
                <PrimaryCheckbox
                  label={item.label}
                  checked={currentFilter === item.value}
                  onChange={() => handleChangeCheck(item.value)}
                />
              </View>
              {item.value === 'custom' && currentFilter === item.value && (
                <TouchableOpacity
                  style={styles.row_center}
                  hitSlop={10}
                  onPress={() => {
                    setIsOpenTimePicker(true);
                  }}>
                  <Text style={[fs_14_400, text_black]}>
                    {dayjs(customTime.fromDate).format('DD/MM/YYYY')} -{' '}
                    {dayjs(customTime.toDate).format('DD/MM/YYYY')}
                  </Text>
                  <ChevronRightIcon />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <PrimaryButton
            onPress={handleSaveValue}
            text={'Áp dụng bộ lọc'}
            buttonStyle={styles.button}
          />
        </View>
      </View>
      {isOpenTimePicker && (
        <DatePickerModal
          setVisible={setIsOpenTimePicker}
          setCustomTime={setCustomTime}
          customTime={customTime}
          handleSaveCustomValue={handleSaveCustomValue}
        />
      )}
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.75)',
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  row_center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  row_container: {
    gap: 12,
    paddingVertical: 15,
  },
  row_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
  },
});

TimeFilterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setTimeValue: PropTypes.func.isRequired,
  timeCustomValue: PropTypes.object.isRequired,
  setTimeCustomValue: PropTypes.func.isRequired,
};
