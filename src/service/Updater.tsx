import {SafeAreaProvider} from 'react-native-safe-area-context';

export function updater<T>(Component: React.ComponentType<any>) {
  return function (props: any) {
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    );
  };
}
