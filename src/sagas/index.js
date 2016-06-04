/* @flow */

import addPaletteSaga from './addPaletteSaga';
import persistenceSaga from './persistenceSaga';

export default function *rootSaga(): Generator<Array<Generator<any, any, any>>, void, void> {
  yield [
    persistenceSaga(),
    addPaletteSaga(),
  ];
}
