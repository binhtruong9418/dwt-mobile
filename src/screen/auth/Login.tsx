import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import {useState} from 'react';
import UsernameInput from '../../components/common/input/UsernameInput.tsx';
import PasswordInput from '../../components/common/input/PasswordInput.tsx';
import {fs_14_400, text_black, text_red} from '../../assets/style.ts';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const Login = ({navigation}: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <SafeAreaView style={styles.wrapper}>
      <Logo width={width - 60} height={200} />
      <View style={styles.container}>
        <UsernameInput
          username={username}
          setUsername={setUsername}
          errorMsg={''}
        />
        <PasswordInput
          setPassword={setPassword}
          password={password}
          errorMsg={'Mật khẩu không đúng'}
        />
        <Pressable
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          hitSlop={8}>
          <Text style={[fs_14_400, text_black]}>Quên mật khẩu</Text>
        </Pressable>
        <PrimaryButton onPress={() => {
          navigation.navigate('HomePage');
        }} text={'Đăng nhập'} />
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.forgotPassword} hitSlop={8}>
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
