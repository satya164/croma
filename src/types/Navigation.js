/* @flow strict */

export type PaletteListParams = void;

export type ColorListParams = {| id: string, name: string |};

export type ColorDetailsParams = {| color: string |};

export type NavigationProp<T> = {|
  push: (
    ...args:
      | ['PaletteList', PaletteListParams]
      | ['ColorList', ColorListParams]
      | ['ColorDetails', ColorDetailsParams]
  ) => void,
  goBack: () => void,
  state: {|
    params: T,
  |},
|};
