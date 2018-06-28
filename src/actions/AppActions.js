/* @flow */

import type { Action } from '../types/Action';

export function loadSavedData(): Action {
  return {
    type: 'LOAD_SAVED_DATA_REQUEST',
  };
}
