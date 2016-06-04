/* @flow */

import React from 'react';
import { AppRegistry } from 'react-native';
import configureStore from './store/configureStore';
import RootContainer from './containers/RootContainer';

const store = configureStore();

const Croma = () => <RootContainer key='root' store={store} />;

AppRegistry.registerComponent('croma', () => Croma);
