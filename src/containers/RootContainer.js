/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';

const RootContainer = (props: Object) => {
  return (
    <Provider store={props.store}>
      <AppContainer />
    </Provider>
  );
};

export default RootContainer;
