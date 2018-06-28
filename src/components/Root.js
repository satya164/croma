/* @flow */

import React from 'react';
import configureStore from '../store/configureStore';
import RootContainer from '../containers/RootContainer';

const store = configureStore();

const Root = () => <RootContainer store={store} />;

export default Root;
