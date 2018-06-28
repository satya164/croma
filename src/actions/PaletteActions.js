/* @flow */

import uuid from 'uuid';

import type { Action } from '../types/Action';

export function showAddPalette(): Action {
  return {
    type: 'SHOW_ADD_PALETTE',
  };
}

export function addPalette(name: string, colors: Array<string>): Action {
  return {
    type: 'ADD_PALETTE',
    payload: {
      id: uuid.v4(),
      name,
      colors,
      createTime: Date.now(),
    },
  };
}

export function deletePalette(id: string): Action {
  return {
    type: 'DELETE_PALETTE',
    payload: {
      id,
    },
  };
}

export function showAddColor(palette: string): Action {
  return {
    type: 'SHOW_ADD_COLOR',
    payload: {
      palette,
    },
  };
}

export function deleteColor(palette: string, color: string): Action {
  return {
    type: 'DELETE_COLOR',
    payload: {
      palette,
      color,
    },
  };
}
