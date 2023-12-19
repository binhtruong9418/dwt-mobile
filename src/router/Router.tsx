import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {updater} from '../service/Updater';
import {routePath} from './routePath.ts';
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

function Router(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={'Login'}>
        {routePath.map((route, index) => (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default updater(Router);
