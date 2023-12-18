import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import HomeIcon from '../../assets/img/bottom-tab/home.svg';
import CommunicationIcon from '../../assets/img/bottom-tab/communication.svg';
import FingerprintIcon from '../../assets/img/bottom-tab/fingerprint.svg';
import NewsIcon from '../../assets/img/bottom-tab/news.svg';
import MenuIcon from '../../assets/img/bottom-tab/menu.svg';
import {
  fs_10_400,
  fs_10_700,
  text_black,
  text_red,
} from '../../assets/style.ts';
import CustomTabBar from '../../components/tabBar/CustomTabBar.tsx';
import {navigatorPath} from '../routePath.ts';

const Tabs = createBottomTabNavigator();

export default function BottomNavigator(): JSX.Element {
  const options = ({route}: any) => {
    return {
      tabBarIcon: () => {
        switch (route.name) {
          case 'Home':
            return <HomeIcon width={25} height={25} />;
          case 'Communication':
            return <CommunicationIcon width={25} height={25} />;
          case 'Attendance':
            return <FingerprintIcon width={35} height={35} />;
          case 'News':
            return <NewsIcon width={25} height={25} />;
          case 'Menu':
            return <MenuIcon width={25} height={25} />;
          default:
            null;
        }
      },
      tabBarLabel: ({isFocused}: any) => {
        switch (route.name) {
          case 'Home':
            return (
              <Text style={[fs_10_400, isFocused ? text_red : text_black]}>
                Trang chủ
              </Text>
            );
          case 'Communication':
            return (
              <Text style={[fs_10_400, isFocused ? text_red : text_black]}>
                Giao tiếp
              </Text>
            );
          case 'Attendance':
            return (
              <Text style={[fs_10_700, isFocused ? text_red : text_black]}>
                CHẤM CÔNG
              </Text>
            );
          case 'News':
            return (
              <Text style={[fs_10_400, isFocused ? text_red : text_black]}>
                Bảng tin
              </Text>
            );
          case 'Menu':
            return (
              <Text style={[fs_10_400, isFocused ? text_red : text_black]}>
                Menu
              </Text>
            );
          default:
            null;
        }
      },
      headerShown: false,
    };
  };
  return (
    <Tabs.Navigator
      screenOptions={options}
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      initialRouteName="Home">
      {navigatorPath.map((route, index) => (
        <Tabs.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Tabs.Navigator>
  );
}
