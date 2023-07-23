import {fork} from 'redux-saga/effects';

import searchImage from './searchImage';

export default function* () {
  yield fork(searchImage);
}
