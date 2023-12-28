import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  fs_14_700,
  mt10,
  mt20,
  text_black,
  text_center,
  text_red,
} from '../../../assets/style.ts';
import CloseIcon from '../../../assets/img/close-icon.svg';
import {useState} from 'react';
import 'dayjs/locale/vi';
import PrimaryButton from '../button/PrimaryButton.tsx';
import {ReactNativeModal} from 'react-native-modal';
export default function CreateOrEditDailyReportModal({
  setVisible,
  visible,
  isEdit,
}: any) {
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
          <Text style={[fs_14_700, text_red, text_center]}>
            {isEdit ? 'SỬA BÁO CÁO NGÀY' : 'THÊM BÁO CÁO NGÀY'}
          </Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              setVisible(false);
            }}>
            <CloseIcon width={20} height={20} style={styles.closeIcon} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Báo cáo hôm qua *"
            placeholderTextColor={'#787878'}
            multiline={true}
          />

          <TextInput
            style={[styles.input, mt20]}
            placeholder="Kế hoạch hôm nay *"
            placeholderTextColor={'#787878'}
            multiline={true}
          />
          <View style={styles.divider} />
          <PrimaryButton
            onPress={() => {}}
            text={isEdit ? 'Cập nhật' : 'Gửi'}
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
    paddingTop: 10,
  },
  input: {
    borderColor: '#787878',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    marginHorizontal: 15,
  },
  mt30: {
    marginTop: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginTop: 20,
  },
});
