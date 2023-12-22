import {StyleSheet, View} from 'react-native';
import Header from '../../components/header/Header.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkDetail({navigation}: any) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="CHI TIẾT KẾ HOẠCH"
        handleGoBack={() => {
          navigation.navigate('Work');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
