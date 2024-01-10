import {SafeAreaProvider} from 'react-native-safe-area-context';
import NoInternetModal from "../components/internet/NoInternetModal.tsx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function updater<T>(Component: React.ComponentType<any>) {
  return function (props: any) {
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    );
  };
}
