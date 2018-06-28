/* @flow */

import type { Palette } from './Palette';

type LoadSavedDataRequest = {|
  type: 'LOAD_SAVED_DATA_REQUEST',
|};

type LoadSavedDataSuccess = {|
  type: 'LOAD_SAVED_DATA_SUCCESS',
  payload: {|
    palettes?: Palette[],
  |},
|};

type LoadSavedDataError = {|
  type: 'LOAD_SAVED_DATA_ERROR',
|};

type SaveDataSuccess = {|
  type: 'SAVE_DATA_SUCCESS',
|};

type SaveDataError = {|
  type: 'SAVE_DATA_ERROR',
|};

type ShowAddPalette = {|
  type: 'SHOW_ADD_PALETTE',
|};

type ShowAddColor = {|
  type: 'SHOW_ADD_COLOR',
  payload: {|
    palette: string,
  |},
|};

type AddPalette = {|
  type: 'ADD_PALETTE',
  payload: {|
    id: string,
    name: string,
    colors: string[],
    createTime: number,
  |},
|};

type AddPaletteError = {|
  type: 'ADD_PALETTE_ERROR',
  payload: {|
    id: string,
  |},
|};

type EditPalette = {|
  type: 'EDIT_PALETTE',
|};

type DeletePalette = {|
  type: 'DELETE_PALETTE',
  payload: {|
    id: string,
  |},
|};

type AddColor = {|
  type: 'ADD_COLOR',
|};

type AddColorError = {|
  type: 'ADD_COLOR_ERROR',
|};

type EditColor = {|
  type: 'EDIT_COLOR',
|};

type DeleteColor = {|
  type: 'DELETE_COLOR',
  payload: {|
    palette: string,
    color: string,
  |},
|};

export type Action =
  | LoadSavedDataRequest
  | LoadSavedDataSuccess
  | LoadSavedDataError
  | SaveDataSuccess
  | SaveDataError
  | ShowAddPalette
  | ShowAddColor
  | AddPalette
  | AddPaletteError
  | EditPalette
  | DeletePalette
  | AddColor
  | AddColorError
  | EditColor
  | DeleteColor;
