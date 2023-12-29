import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useState} from 'react';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';

export default function WorkStorage({navigation}: any) {
  const {
    connection: {userInfo, currentTabManager},
    onSetCurrentTabManager,
  } = useConnection();
  const [currentWorkTab, setCurrentWorkTab] = useState(0);

  return (
    <SafeAreaView style={styles.wrapper}>
      {userInfo && userInfo.role === 'admin' && (
        <AdminTabBlock
          currentTab={currentTabManager}
          setCurrentTab={onSetCurrentTabManager}
          secondLabel={'Quản lý'}
        />
      )}
      <Header title={'KHO VIỆC'} handleGoBack={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
