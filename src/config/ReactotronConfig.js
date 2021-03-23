import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const reactotron = Reactotron.configure({host: '192.168.1.104'})
    .useReactNative()
    .connect();

  // eslint-disable-next-line no-console
  console.rtt = reactotron;

  reactotron.clear();
}
