import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import {useState} from 'react';
import UsernameInput from '../../components/common/input/UsernameInput.tsx';
import PasswordInput from '../../components/common/input/PasswordInput.tsx';
import {fs_14_400, text_black, text_red} from '../../assets/style.ts';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {validateEmail, validatePhone} from '../../utils';
import {useConnection} from '../../redux/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dwtApi} from '../../api/service/dwtApi.ts';

const {width} = Dimensions.get('window');
const Login = ({navigation}: any) => {
  const {onSetUserInfo} = useConnection();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username) {
      setUsernameError('Tên đăng nhập là trường bắt buộc');
      return;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Mật khẩu là trường bắt buộc');
      return;
    } else {
      setPasswordError('');
    }

    if (!validateEmail(username) && !validatePhone(username)) {
      setUsernameError('Tên đăng nhập không hợp lệ');
      return;
    } else {
      setUsernameError('');
    }

    try {
      setIsLoading(true);
      const response = await dwtApi.login(
        username.trim().toLowerCase(),
        password.trim(),
      );
      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', response.data.token);
        onSetUserInfo(response.data.user);
        navigation.navigate('HomePage');
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        setPasswordError('Mật khẩu không đúng');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Logo width={width - 60} height={200} />
      <View style={styles.container}>
        <UsernameInput
          username={username}
          setUsername={setUsername}
          errorMsg={usernameError}
        />
        <PasswordInput
          setPassword={setPassword}
          password={password}
          errorMsg={passwordError}
        />
        <Pressable
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          hitSlop={8}>
          <Text style={[fs_14_400, text_black]}>Quên mật khẩu</Text>
        </Pressable>
        <PrimaryButton
          onPress={handleLogin}
          text={'Đăng nhập'}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.forgotPassword} hitSlop={10}>
          <Text style={[fs_14_400, text_black, styles.footerText]}>
            Nếu gặp vấn đề về tài khoản hãy liên hệ đến{' '}
            <Text style={[text_red]}>Admin</Text>
          </Text>
        </Pressable>
      </View>
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
  container: {
    gap: 20,
    flex: 0.9,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 0.1,
  },
  footerText: {
    textAlign: 'center',
  },
});
export default Login;
