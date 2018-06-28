/* @flow */

import { combineReducers } from 'redux';
import loading from './loading';
import palettes from './palettes';

const reducers = {
  loading,
  palettes,
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
