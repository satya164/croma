/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import type { Store } from '../types/Store';

type Props = {
  store: Store,
};

export default function RootContainer(props: Props) {
  return (
    <Provider store={props.store}>
      <AppContainer />
    </Provider>
  );
}
