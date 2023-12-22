import {ReactNativeModal} from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import CheckSuccess from '../../../assets/img/check-success.svg';
import {
  fs_14_400,
  fs_16_500,
  text_black,
  text_center,
  text_gray,
} from '../../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';
import PrimaryButton from '../button/PrimaryButton.tsx';

export default function ConfirmUploadWorkReportModal({
  visible,
  setVisible,
  handlePressOk,
}: InferProps<typeof ConfirmUploadWorkReportModal.propTypes>) {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
      }}
      swipeDirection={['up']}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={{alignItems: 'center'}}>
          <CheckSuccess width={50} height={50} />
        </View>
        <Text style={[fs_16_500, text_black, text_center]}> Thông báo</Text>
        <Text style={[fs_14_400, text_gray, text_center, styles.description]}>
          Báo cáo thành công
        </Text>
        <PrimaryButton
          onPress={handlePressOk}
          text={'Đồng ý'}
          buttonStyle={styles.button}
        />
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 10,
  },
  description: {
    marginVertical: 10,
  },
});

ConfirmUploadWorkReportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  handlePressOk: PropTypes.func.isRequired,
};
