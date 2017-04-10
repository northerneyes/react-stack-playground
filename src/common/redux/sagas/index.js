import {fork} from 'redux-saga/effects';
import home from './home.saga';

export default function* root() {
  yield [
    home()
  ]
}