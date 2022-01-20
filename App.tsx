/**
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from './src/navigation';
import configureStore from './src/store';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const store = configureStore();
const persistor = persistStore(store);
console.disableYellowBox = true;

class App extends React.Component {
  render() {
    const {type} = store.getState().appTheme.theme;
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

codePush(codePushOptions)(App);

export default App;
