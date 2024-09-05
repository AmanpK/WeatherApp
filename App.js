import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store/configureStore';
import AppNavigator from './src/navigation/AppNavigator';
import {PersistGate} from 'redux-persist/lib/integration/react';
import 'react-native-devsettings';
import { ActivityIndicator } from 'react-native';

const {store,persistor} = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
