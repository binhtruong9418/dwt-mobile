import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import Logo from '../../../assets/img/logo.svg';

const {width} = Dimensions.get('window');
export default function PrimaryLoading() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Logo width={width - 100} height={100} />
      <ActivityIndicator size="large" color="#DC3545" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
