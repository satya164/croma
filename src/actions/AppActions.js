/* @flow */

import { LOAD_SAVED_DATA_REQUEST } from '../constants/ActionTypes';

type Action = {
  type: string
}

export function loadSavedData(): Action {
  return {
    type: LOAD_SAVED_DATA_REQUEST,
  };
}
