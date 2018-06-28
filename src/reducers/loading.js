/* @flow */

import type { Action } from '../types/Action';

export default (currentState: boolean = true, action: Action): boolean => {
  switch (action.type) {
    case 'LOAD_SAVED_DATA_SUCCESS':
    case 'LOAD_SAVED_DATA_ERROR':
      return false;
    default:
      return currentState;
  }
};
