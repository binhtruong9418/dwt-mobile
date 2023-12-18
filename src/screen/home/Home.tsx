import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/header/Header.tsx';

export default function Home({navigation}: any) {
  return (
    <View style={styles.wrapper}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
