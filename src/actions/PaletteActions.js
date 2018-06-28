/* @flow strict */

import uuid from 'uuid';
import ImageChooser from '../modules/ImageChooser';
import ColorExtractor from '../modules/ColorExtractor';

import type { Action } from '../types/Action';
import type { Dispatch } from '../types/Store';

export function showAddPalette() {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'SHOW_ADD_PALETTE' });

    try {
      const data = await ImageChooser.pickImageWithCamera();
      const colors = await ColorExtractor.extractColors(data.uri, 6);

      if (data && data.name) {
        dispatch(addPalette(data.name, colors));
      } else {
        dispatch({
          type: 'ADD_PALETTE_ERROR',
          message: `Invalid data: ${JSON.stringify(data)}`,
        });
      }
    } catch (e) {
      dispatch({ type: 'ADD_PALETTE_ERROR', message: e.message });
    }
  };
}

export function addPalette(name: string, colors: Array<string>): Action {
  return {
    type: 'ADD_PALETTE',
    payload: {
      id: uuid.v4(),
      name,
      colors,
      createdAt: Date.now(),
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
