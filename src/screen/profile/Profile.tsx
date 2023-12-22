import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChevronLeft from '../../assets/img/chevron-left-dark.svg';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useConnection} from '../../redux/connection';

export default function Profile({navigation}: any) {
  const {onSetUserInfo} = useConnection();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    onSetUserInfo(null);
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity
        style={styles.backIcon}
        hitSlop={10}
        onPress={() => {
          navigation.goBack();
        }}>
        <ChevronLeft width={16} height={16} />
      </TouchableOpacity>
      <PrimaryButton
        onPress={handleLogout}
        text={'Đăng xuất'}
        buttonStyle={styles.buttonStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  buttonStyle: {
    paddingVertical: 12,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 6,
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
