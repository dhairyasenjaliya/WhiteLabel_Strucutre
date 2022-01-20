/**
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import Navigator from './src/navigation';
import configureStore from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import codePush from 'react-native-code-push';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const store = configureStore();
const persistor = persistStore(store);
console.disableYellowBox = true;
// const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

class App extends React.Component {
  render() {
    const {type} = store.getState().appTheme.theme;
    // console.log('PRIMARY_BACKGRO/UND_COLOR=>>>>>', type);
    StatusBar.setBarStyle(
      type === 'darkTheme' ? 'light-content' : 'dark-content',
      true,
    );
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigator />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

App = codePush(codePushOptions)(App);

export default App;
