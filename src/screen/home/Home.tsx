import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import Header from '../../components/header/Header.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from '../../assets/img/banner.svg';
import SummaryBlock from '../../components/home/SummaryBlock.tsx';
import TargetBlock from '../../components/home/TargetBlock.tsx';
import ProgressBlock from '../../components/home/ProgressBlock.tsx';
import MenuBlock from '../../components/home/MenuBlock.tsx';

const {width: windowWidth} = Dimensions.get('window');

export default function Home({navigation}: any) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      <ScrollView style={styles.container} contentContainerStyle={styles.pb20}>
        <Banner
          width={windowWidth}
          height={(windowWidth / 16) * 9}
          style={[styles.banner]}
        />
        <View style={styles.content}>
          <SummaryBlock />
          <TargetBlock />
          <ProgressBlock />
          <MenuBlock />
        </View>
      </ScrollView>
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
    top: 0,
  },
  container: {
    position: 'relative',
  },
  pb20: {
    paddingBottom: 20,
  },
  content: {
    marginTop: 140,
    gap: 12,
    paddingHorizontal: 10,
  },
});
