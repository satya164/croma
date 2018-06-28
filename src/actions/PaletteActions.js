/* @flow */

import uuid from 'uuid';

import {
  SHOW_ADD_PALETTE,
  SHOW_ADD_COLOR,
  ADD_PALETTE,
  DELETE_PALETTE,
  DELETE_COLOR,
} from '../constants/ActionTypes';

type Action = {
  type: string,
};

export function showAddPalette(): Action {
  return {
    type: SHOW_ADD_PALETTE,
  };
}

export function addPalette(name: string, colors: Array<string>): Action {
  return {
    type: ADD_PALETTE,
    payload: {
      id: uuid.v1(),
      name,
      colors,
      createTime: Date.now(),
    },
  };
}

export function deletePalette(id: number): Action {
  return {
    type: DELETE_PALETTE,
    payload: {
      id,
    },
  };
}

export function showAddColor(palette: number): Action {
  return {
    type: SHOW_ADD_COLOR,
    payload: {
      palette,
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
