import {call, put, takeLatest} from 'redux-saga/effects';

import {CLIENT_ID} from '@src/constants/auth';

import {ApiOptions} from '@src/types/api';

import {downloadFileFromBase64String} from '@src/utils/downloadFile';

import {getDownloadImage} from '../actions/downloadImage';
import {setIsLoading} from '../actions/loadingIndicator';

import api from '../sagas/api/api';

export function* fetchDownloadImage({payload}: {payload: {url: string}}) {
  yield put(setIsLoading(true));

  const {url} = payload;

  const downloadImageApiConfig: ApiOptions = {
    path: `${url}&client_id=${CLIENT_ID}`,
    method: 'GET',
  };

  yield put(setIsLoading(false));
}

export default function* downloadImageSaga() {
  yield takeLatest(getDownloadImage, fetchDownloadImage);
}
