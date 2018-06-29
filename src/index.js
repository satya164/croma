/* @flow strict */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import configureStore from './store/configureStore';
import Splash from './components/Splash';
import App from './components/App';
import { primary, text, accent } from './constants/Colors';

const { store, persistor } = configureStore({
  palettes: require('./data.json'),
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary,
    accent,
    text,
  },
};

function Croma() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={<Splash />} persistor={persistor}>
          <App />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('croma', () => Croma);
