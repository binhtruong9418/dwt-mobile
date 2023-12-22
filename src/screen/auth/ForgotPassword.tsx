import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import {useState} from 'react';
import UsernameInput from '../../components/common/input/UsernameInput.tsx';
import {
  fs_13_400,
  fs_14_400,
  fs_15_500,
  fs_15_700,
  text_black,
  text_center,
  text_red,
} from '../../assets/style.ts';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import ChevronLeftRed from '../../assets/img/chevron-left-red.svg';
import {ReactNativeModal} from 'react-native-modal';
import CheckSuccess from '../../assets/img/check-success.svg';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const ForgotPassword = ({navigation}: any) => {
  const [username, setUsername] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.wrapper}>
      <Logo width={width - 60} height={200} />
      <View style={styles.container}>
        <Text style={[fs_15_700, text_red, text_center]}>
          Bạn quên mật khẩu?
        </Text>
        <Text style={[fs_13_400, text_black, text_center, styles.mb3]}>
          Vui lòng nhập số điện thoại để cấp lại mật khẩu mới
        </Text>
        <UsernameInput
          username={username}
          setUsername={setUsername}
          errorMsg={''}
          label={'Số điện thoại'}
          placeholder={'Nhập số điện thoại'}
        />
        <PrimaryButton
          onPress={() => {
            setIsOpenModal(true);
          }}
          text={'Lấy lại mật khẩu'}
          buttonStyle={styles.forgotButton}
        />
        <PrimaryButton
          onPress={() => {
            navigation.navigate('Login');
          }}
          text={'Quay lại'}
          bgColor={'#fff'}
          textColor={'#E00'}
          borderColor={'#E00'}
          icon={<ChevronLeftRed width={16} height={16} />}
        />
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.forgotPassword} hitSlop={8}>
          <Text style={[fs_14_400, text_black, text_center]}>
            Nếu gặp vấn đề về tài khoản hãy liên hệ đến{' '}
            <Text style={[text_red]}>Admin</Text>
          </Text>
        </Pressable>
      </View>
      <ReactNativeModal
        isVisible={isOpenModal}
        onBackdropPress={() => {
          setIsOpenModal(false);
        }}
        onBackButtonPress={() => {
          setIsOpenModal(false);
        }}
        swipeDirection={['up']}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <CheckSuccess width={50} height={50} />
          <Text style={[fs_15_500, text_black, text_center]}>
            Mật khẩu đã cập nhật về mặc định
          </Text>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  forgotButton: {
    paddingVertical: 12,
    marginVertical: 20,
  },
  mb3: {
    marginBottom: 30,
  },
  container: {
    flex: 0.9,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 0.1,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
});
export default ForgotPassword;
