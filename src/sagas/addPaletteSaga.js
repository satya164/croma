/* @flow */

import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { NativeModules } from 'react-native';
import { addPalette } from '../actions/PaletteActions';

const {
  ImageChooserModule,
  ColorExtractorModule,
} = NativeModules;

function *showAddPalette() {
  try {
    const data = yield ImageChooserModule.pickImageWithCamera();
    const colors = yield ColorExtractorModule.extractColors(data.uri, 6);

    yield put(addPalette(data.name, colors));
  } catch (e) {
    console.error(e);
    yield put({ type: 'ADD_PALETTE_FAILED', message: e.message });
  }
}

export default function *showAddPaletteSaga() {
  yield* takeEvery('SHOW_ADD_PALETTE', showAddPalette);
}
