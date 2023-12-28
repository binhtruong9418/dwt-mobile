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
  fs_15_500,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';
import NoticeIcon from '../../assets/img/notice-icon.svg';
import ReceiveWorkIcon from '../../assets/img/receive-work-icon.svg';
import GiveWorkIcon from '../../assets/img/give-work-icon.svg';
import {useConnection} from '../../redux/connection';

export default function PlusButtonModal({
  visible,
  setVisible,
  position,
  navigation,
  hasReceiveWork,
}: InferProps<typeof PlusButtonModal.propTypes>) {
  const {
    connection: {userInfo},
  } = useConnection();
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
      <View
        style={[
          styles.content,
          {
            right: 10,
            top: '50%',
          },
        ]}>
        <TouchableOpacity style={styles.item}>
          <NoticeIcon width={20} height={20} />
          <Text style={[fs_15_500, text_black]}>Đề xuất</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ReceiveWorkIcon width={20} height={20} />
          <Text style={[fs_15_500, text_black]}>Nhận việc</Text>
        </TouchableOpacity>
        {(userInfo.role === 'admin' || userInfo.role === 'manager') &&
          hasReceiveWork && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('AddWorkArise');
              }}>
              <GiveWorkIcon width={20} height={20} />
              <Text style={[fs_15_500, text_black]}>Giao việc phát sinh</Text>
            </TouchableOpacity>
          )}
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#D9D9D9CC',
    margin: 0,
  },
  content: {
    width: 180,
    // height: 100,
    gap: 5,
    position: 'absolute',
  },
  item: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'rgba(108, 117, 138, 0.07)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 1 / 40,
    shadowRadius: 8,
    flexDirection: 'row',
    padding: 8,
    gap: 8,
    alignItems: 'center',
  },
});

PlusButtonModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  position: PropTypes.any.isRequired,
  navigation: PropTypes.any,
  hasReceiveWork: PropTypes.bool,
};
