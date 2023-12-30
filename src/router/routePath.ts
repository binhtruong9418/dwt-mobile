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
  ProfileScreen,
  WorkListReportScreen,
  AddWorkAriseScreen,
  UserInfoScreen,
  SalaryInfoScreen,
  WorkInfoScreen,
  EducationInfoScreen,
  AbsenceInfoScreen,
  RewardAndPunishInfoScreen,
  SettingInfoScreen,
  SalaryDetailScreen,
  DailyReportScreen,
  WorkStorageScreen,
  AttendanceSummaryScreen,
  ProjectWorkDetailScreen,
  AttendanceHistoryScreen,
  ProposeScreen,
  AddProposeScreen,
  WorkDetailDepartmentScreen,
  WorkDetailOfficeScreen, AddAbsenceScreen,
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
  {
    name: 'WorkListReport',
    component: WorkListReportScreen,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'AddWorkArise',
    component: AddWorkAriseScreen,
  },
  {
    name: 'UserInfo',
    component: UserInfoScreen,
  },
  {
    name: 'SalaryInfo',
    component: SalaryInfoScreen,
  },
  {
    name: 'WorkInfo',
    component: WorkInfoScreen,
  },
  {
    name: 'EducationInfo',
    component: EducationInfoScreen,
  },
  {
    name: 'AbsenceInfo',
    component: AbsenceInfoScreen,
  },
  {
    name: 'RewardAndPunishInfo',
    component: RewardAndPunishInfoScreen,
  },
  {
    name: 'SettingInfo',
    component: SettingInfoScreen,
  },
  {
    name: 'SalaryDetail',
    component: SalaryDetailScreen,
  },
  {
    name: 'DailyReport',
    component: DailyReportScreen,
  },
  {
    name: 'WorkStorage',
    component: WorkStorageScreen,
  },
  {
    name: 'AttendanceSummary',
    component: AttendanceSummaryScreen,
  },
  {
    name: 'ProjectWorkDetail',
    component: ProjectWorkDetailScreen,
  },
  {
    name: 'AttendanceHistory',
    component: AttendanceHistoryScreen,
  },
  {
    name: 'Propose',
    component: ProposeScreen,
  },
  {
    name: 'AddPropose',
    component: AddProposeScreen,
  },
  {
    name: 'WorkDetailDepartment',
    component: WorkDetailDepartmentScreen,
  },
  {
    name: 'WorkDetailOffice',
    component: WorkDetailOfficeScreen,
  },
  {
    name: 'AddAbsence',
    component: AddAbsenceScreen,
  }
];
