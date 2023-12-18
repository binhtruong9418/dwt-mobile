// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function updater<T>(Component: React.ComponentType<any>) {
  return function (props: any) {
    return <Component {...props} />;
  };
}
