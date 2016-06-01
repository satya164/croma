/* @flow */

import React from 'react';
import configureStore from './store/configureStore';
import RootContainer from './containers/RootContainer';
import palettes from './data.json';

const store = configureStore({
  palettes,
});

const App = () => <RootContainer key='root' store={store} />;

export default App;
