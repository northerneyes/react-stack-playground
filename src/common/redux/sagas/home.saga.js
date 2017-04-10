import {put, take} from 'redux-saga/effects';

let i = 0;

export default function* () {
  while (true) {
    yield take('LOAD_HOME_NEW_DATA');
    yield put({type: 'HOME_NEW_DATA_LOADED', payload: `new data ${i++}`});
  }
}