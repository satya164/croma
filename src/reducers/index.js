/* @flow */

import { combineReducers } from 'redux';
import navigation from './navigation';
import palettes from './palettes';

const rootReducer = combineReducers({
  navigation,
  palettes,
});

export default rootReducer;
