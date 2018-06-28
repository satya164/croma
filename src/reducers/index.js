/* @flow */

import { combineReducers } from 'redux';
import loading from './loading';
import palettes from './palettes';

const rootReducer = combineReducers({
  loading,
  palettes,
});

export default rootReducer;
