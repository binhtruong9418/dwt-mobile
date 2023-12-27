import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {fs_15_700, text_center, text_white} from '../../assets/style.ts';

export default function SettingInfo({navigation}: any) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title={'Cập nhật mật khẩu'}
        handleGoBack={() => navigation.navigate('Profile')}
        rightView={
          <TouchableOpacity style={styles.sendButton}>
            <Text style={[fs_15_700, text_white, text_center]}>Lưu</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#BC2426',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
