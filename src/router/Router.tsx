import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {updater} from '../service/Updater';
import {routePath} from './routePath.ts';
import {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useConnection} from '../redux/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authService} from '../api/service/authService.ts';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

const Router = () => {
  const {onSetUserInfo} = useConnection();
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [firstScreen, setFirstScreen] = useState<string | null>(null);

  const checkToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const response = await authService.me();
        if (response.status === 200) {
          onSetUserInfo(response.data);
          setIsLogin(true);
        }
      } catch (error: any) {
        setIsLogin(false);
        if (error.status === 401) {
          await AsyncStorage.removeItem('accessToken');
        }
      }
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkToken().then(() => {
      setAppIsReady(true);
      SplashScreen.hide();
    });
  }, []);

  useEffect(() => {
    if (!appIsReady) {
      return;
    }
    if (!isLogin) {
      setFirstScreen('Login');
    } else {
      setFirstScreen('HomePage');
    }
  }, [appIsReady]);

  return (
    <NavigationContainer>
      {appIsReady && firstScreen && (
        <Stack.Navigator
          screenOptions={screenOptions}
          initialRouteName={firstScreen}>
          {routePath.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
              options={{
                animation: 'slide_from_right',
              }}
            />
          ))}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default updater(Router);
