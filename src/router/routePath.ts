import {
  AttendanceScreen,
  WorkScreen,
  ForgotPasswordScreen,
  HomeScreen,
  LoginScreen,
  MenuScreen,
  NewsScreen,
  WorkDetailScreen,
  WorkReportScreen,
} from '../screen';
import BottomNavigator from './navigator/BottomNavigator.tsx';

export const routePath = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
  {
    name: 'HomePage',
    component: BottomNavigator,
  },
];

export const navigatorPath = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Work',
    component: WorkScreen,
  },
  {
    name: 'Attendance',
    component: AttendanceScreen,
  },
  {
    name: 'News',
    component: NewsScreen,
  },
  {
    name: 'Menu',
    component: MenuScreen,
  },
  {
    name: 'WorkDetail',
    component: WorkDetailScreen,
  },
  {
    name: 'WorkReport',
    component: WorkReportScreen,
  },
];
