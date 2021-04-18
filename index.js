/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import myAccount from './src/container/myAccount';
// import searchScreen from './src/container/searchScreen';
// import homeScreen from './src/container/homeScreen';
// import bookingDetails from './src/container/bookingDetails';

import App from './App';

import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
