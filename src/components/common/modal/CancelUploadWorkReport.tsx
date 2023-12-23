import {ReactNativeModal} from 'react-native-modal';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckSuccess from '../../../assets/img/check-success.svg';
import {
  fs_15_400,
  fs_15_500,
  fs_15_700,
  mb20,
  text_black,
  text_center,
  text_red,
} from '../../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';

export default function CancelUploadWorkReport({
  visible,
  setVisible,
  handleCancelUploadReport,
}: InferProps<typeof CancelUploadWorkReport.propTypes>) {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
      }}
      swipeDirection={['up']}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={[fs_15_700, text_black, text_center, mb20]}>
          Bạn thực sự muốn hủy báo cáo?
        </Text>

        <View style={styles.divider} />

        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text
            style={[
              fs_15_400,
              text_center,
              {paddingVertical: 15, color: '#0D6EFD'},
            ]}>
            Tiếp tục báo cáo
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={handleCancelUploadReport}>
          <Text
            style={[fs_15_400, text_red, text_center, {paddingVertical: 15}]}>
            Hủy báo cáo
          </Text>
        </TouchableOpacity>
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
    paddingTop: 30,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    width: '100%',
  },
});

CancelUploadWorkReport.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  handleCancelUploadReport: PropTypes.func.isRequired,
};
