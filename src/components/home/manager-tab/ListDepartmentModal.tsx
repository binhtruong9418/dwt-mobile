import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes, {InferProps} from 'prop-types';
import {ReactNativeModal} from 'react-native-modal';
import {fs_14_700, text_center, text_red} from '../../../assets/style.ts';
import CloseIcon from '../../../assets/img/close-icon.svg';
import PrimaryCheckbox from '../../common/checkbox/PrimaryCheckbox.tsx';
import {useState} from 'react';
import PrimaryButton from '../../common/button/PrimaryButton.tsx';
import {LIST_TIME_FILTER} from '../../../assets/constant.ts';
export default function ListDepartmentModal({
  visible,
  setVisible,
  setCurrentDepartment,
  currentDepartment,
  listDepartment,
}: InferProps<typeof ListDepartmentModal.propTypes>) {
  const [currentFilter, setCurrentFilter] = useState(currentDepartment.value);

  const handleChangeCheck = (value: string) => {
    setCurrentFilter(value);
  };
  const handleSaveValue = () => {
    setCurrentDepartment(currentFilter);
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
          <Text style={[fs_14_700, text_red, text_center]}>LỌC PHÒNG BAN</Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              setVisible(false);
            }}>
            <CloseIcon width={20} height={20} style={styles.closeIcon} />
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            data={listDepartment}
            renderItem={({item}) => {
              return (
                <PrimaryCheckbox
                  label={item.name}
                  checked={currentFilter === item.id}
                  onChange={() => handleChangeCheck(item.id)}
                />
              );
            }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <PrimaryButton
            onPress={handleSaveValue}
            text={'Áp dụng bộ lọc'}
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
  content: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: '70%',
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
  },
});

ListDepartmentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  currentDepartment: PropTypes.any.isRequired,
  setCurrentDepartment: PropTypes.func.isRequired,
  listDepartment: PropTypes.any.isRequired,
};
