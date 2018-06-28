/* @flow */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import Splash from './components/Splash';
import App from './components/App';

const { store, persistor } = configureStore({
  palettes: require('./data.json'),
});

function Croma() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent('croma', () => Croma);
