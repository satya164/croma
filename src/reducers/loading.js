/* @flow */

import {
  LOAD_SAVED_DATA,
  LOAD_SAVED_DATA_FAILED,
} from '../constants/ActionTypes';

type Action = {
  type: string
}

export default (currentState : boolean = true, action: Action): boolean => {
  switch (action.type) {
  case LOAD_SAVED_DATA:
  case LOAD_SAVED_DATA_FAILED:
    return false;
  default:
    return currentState;
  }
};
