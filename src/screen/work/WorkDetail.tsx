import {StyleSheet, View} from 'react-native';
import Header from '../../components/header/Header.tsx';

export default function WorkDetail({navigation}: any) {
  return (
    <View style={styles.wrapper}>
      <Header
        title="CHI TIẾT KẾ HOẠCH"
        handleGoBack={() => {
          navigation.navigate('Work');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
