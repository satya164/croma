/* @flow */

import { combineReducers } from 'redux';
import palettes from './palettes';

const reducers = {
  palettes,
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
