import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes, {InferProps} from 'prop-types';
import {PresentationStyle, ReactNativeModal} from 'react-native-modal';
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
import {useCallback, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

export default function UploadFileModal({
  visible,
  setVisible,
  handleUploadFile,
}: InferProps<typeof UploadFileModal.propTypes>) {
  const handleSelectFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      handleUploadFile(response);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSelectImage = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      presentationStyle: 'fullScreen' as PresentationStyle,
    };

    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      if (result?.assets) {
        handleUploadFile(
          result?.assets.map((image: any) => {
            return {
              ...image,
              name: image.fileName,
              size: image.fileSize,
            };
          }),
        );
      }
    }
  };

  const handleTakePhoto = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      presentationStyle: 'fullScreen' as PresentationStyle,
    };

    const result = await launchCamera(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      if (result?.assets) {
        handleUploadFile(
          result?.assets.map((image: any) => {
            return {
              ...image,
              name: image.fileName,
              size: image.fileSize,
            };
          }),
        );
      }
    }
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
          <TouchableOpacity style={styles.row} onPress={handleSelectFile}>
            <FileIcon width={24} height={24} />
            <Text style={[fs_15_400, text_black]}>Tệp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleSelectImage}>
            <GaleryIcon width={24} height={24} />
            <Text style={[fs_15_400, text_black]}>Chọn ảnh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleTakePhoto}>
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
