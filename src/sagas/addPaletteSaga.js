/* @flow */

import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { addPalette } from '../actions/PaletteActions';
import ImageChooser from '../modules/ImageChooser';
import ColorExtractor from '../modules/ColorExtractor';

function *showAddPalette() {
  try {
    const data = yield ImageChooser.pickImageWithCamera();
    /* $FlowFixMe */
    const colors = yield ColorExtractor.extractColors(data.uri, 6);

    if (data && data.name && colors) {
      yield put(addPalette(data.name, colors));
    } else {
      yield put({ type: 'ADD_PALETTE_FAILED' });
    }
  } catch (e) {
    yield put({ type: 'ADD_PALETTE_FAILED', message: e.message });
  }
}

export default function *showAddPaletteSaga(): Generator<void, void, void> {
  yield* takeEvery('SHOW_ADD_PALETTE', showAddPalette);
}
