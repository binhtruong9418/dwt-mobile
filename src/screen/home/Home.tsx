import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Header from '../../components/header/Header.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../../assets/img/banner.svg';
import SummaryBlock from '../../components/home/SummaryBlock.tsx';

const {width: windowWidth} = Dimensions.get('window');

export default function Home({navigation}: any) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      <Banner width={windowWidth} height={windowWidth / 16 * 9} style={styles.banner} />
      <View style={styles.content}>
        <SummaryBlock />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    position: 'absolute',
    left: 0,
    top: 110,
  },
  content: {
    marginTop: 160,
  }
});
