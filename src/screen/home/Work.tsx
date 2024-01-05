import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminTabBlock from '../../components/common/tab/AdminTabBlock.tsx';
import { useConnection } from '../../redux/connection';
import UserBusinessWork from "../../components/work/user/UserBusinessWork.tsx";
import ManagerBusinessWork from "../../components/work/manager/ManagerBusinessWork.tsx";
import UserOfficeWork from "../../components/work/user/UserOfficeWork.tsx";
import {
  LIST_BUSINESS_DEPARTMENT,
  LIST_FACTORY_DEPARTMENT,
  LIST_OFFICE_DEPARTMENT,
} from '../../assets/constant.ts';
import ManagerOfficeWork from "../../components/work/manager/ManagerOfficeWork.tsx";
import UserFactoryWork from "../../components/work/user/UserFactoryWork.tsx";
import ManagerFactoryWork from "../../components/work/manager/ManagerFactoryWork.tsx";

export default function Work({ navigation }: any) {
  const {
    connection: { userInfo, currentTabManager },
  } = useConnection();

  return (
    userInfo && (
      <SafeAreaView style={styles.wrapper}>
        <AdminTabBlock />
        {currentTabManager === 0 ? (
          LIST_BUSINESS_DEPARTMENT.includes(userInfo?.departement_id) ? (
            <UserBusinessWork navigation={navigation} />
          ) : LIST_OFFICE_DEPARTMENT.includes(userInfo?.departement_id) ? (
            <UserOfficeWork navigation={navigation} />
          ) : LIST_FACTORY_DEPARTMENT.includes(userInfo?.departement_id) ? (
            <UserFactoryWork navigation={navigation} />
          ) : null
        ) : LIST_BUSINESS_DEPARTMENT.includes(userInfo?.departement_id) ? (
          <ManagerBusinessWork navigation={navigation} />
        ) : LIST_OFFICE_DEPARTMENT.includes(userInfo?.departement_id) ? (
          <ManagerOfficeWork navigation={navigation} />
        ) : LIST_FACTORY_DEPARTMENT.includes(userInfo?.departement_id) ? (
          <ManagerFactoryWork navigation={navigation} />
        ) : null}
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    position: 'relative',
  },
});
