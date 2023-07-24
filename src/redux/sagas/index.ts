import {fork} from 'redux-saga/effects';

import searchImage from './searchImage';
import downloadImage from './downloadImage';

export default function* () {
  yield fork(searchImage);
  yield fork(downloadImage);
}
