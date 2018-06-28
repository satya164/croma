/* @flow */

import { takeLatest } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

const PERSISTENCE_KEY = 'app_state_data_v1';

function* saveDataToStorage() {
  try {
    const currentState = yield select();
    if (currentState) {
      const stateString = JSON.stringify(currentState);
      yield AsyncStorage.setItem(PERSISTENCE_KEY, stateString);
      yield put({ type: 'SAVE_DATA_SUCCESS' });
    } else {
      yield put({ type: 'SAVE_DATA_ERROR' });
    }
  } catch (e) {
    yield put({ type: 'SAVE_DATA_ERROR', message: e.message });
  }
}

function* loadDataFromStorage() {
  try {
    const savedString = yield AsyncStorage.getItem(PERSISTENCE_KEY);
    if (savedString) {
      const payload = JSON.parse(savedString);
      yield put({
        type: 'LOAD_SAVED_DATA_SUCESS',
        payload,
      });
    } else {
      yield put({ type: 'LOAD_SAVED_DATA_SUCCESS', payload: {} });
    }
  } catch (e) {
    yield put({ type: 'LOAD_SAVED_DATA_ERROR', message: e.message });
  }
}

function* saveDataSaga() {
  yield* takeLatest(
    [
      'ADD_PALETTE',
      'ADD_COLOR',
      'EDIT_PALETTE',
      'EDIT_COLOR',
      'DELETE_PALETTE',
      'DELETE_COLOR',
    ],
    saveDataToStorage
  );
}

function* loadDataSaga() {
  yield* takeLatest('LOAD_SAVED_DATA_REQUEST', loadDataFromStorage);
}

export default function* persistenceSaga(): Generator<
  Array<Generator<any, any, any>>,
  void,
  void
> {
  yield [saveDataSaga(), loadDataSaga()];
}
