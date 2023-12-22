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
  fs_14_700,
  fs_15_400,
  text_black,
  text_center,
  text_red,
} from '../../../assets/style.ts';
import CloseIcon from '../../../assets/img/close-icon.svg';
import FileIcon from '../../../assets/img/file-icon.svg';
import GaleryIcon from '../../../assets/img/galery-icon.svg';
import CameraIcon from '../../../assets/img/camera-icon.svg';

export default function UploadFileModal({
  visible,
  setVisible,
  handleUploadFile,
}: InferProps<typeof UploadFileModal.propTypes>) {
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
          <Text style={[fs_14_700, text_red, text_center]}>ĐÍNH KÈM</Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              setVisible(false);
            }}>
            <CloseIcon width={20} height={20} style={styles.closeIcon} />
          </Pressable>
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={styles.row} onPress={handleUploadFile}>
            <FileIcon width={24} height={24} />
            <Text style={[fs_15_400, text_black]}>Tệp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleUploadFile}>
            <GaleryIcon width={24} height={24} />
            <Text style={[fs_15_400, text_black]}>Chọn ảnh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleUploadFile}>
            <CameraIcon width={24} height={24} />
            <Text style={[fs_15_400, text_black]}>Sử dụng máy ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  body: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

UploadFileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  handleUploadFile: PropTypes.func.isRequired,
};
