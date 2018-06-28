/* @flow strict */

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
    createdAt: number,
  |},
|};

type AddPaletteError = {|
  type: 'ADD_PALETTE_ERROR',
  message: string,
|};

type EditPalette = {|
  type: 'EDIT_PALETTE',
  payload: {|
    id: string,
  |},
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
  message: string,
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
