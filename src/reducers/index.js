/* @flow */

import { combineReducers } from 'redux';
import loading from './loading';
import navigation from './navigation';
import palettes from './palettes';

const rootReducer = combineReducers({
  loading,
  navigation,
  palettes,
});

export default rootReducer;
