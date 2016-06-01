/* @flow */

import { DELETE_PALETTE, DELETE_COLOR } from '../constants/ActionTypes';

type Action = {
  type: string
}

export function deletePalette(id: number): Action {
  return {
    type: DELETE_PALETTE,
    payload: {
      id,
    },
  };
}

export function deleteColor(palette: number, color: string): Action {
  return {
    type: DELETE_COLOR,
    payload: {
      palette,
      color,
    },
  };
}
