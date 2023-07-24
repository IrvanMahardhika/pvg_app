import {call, put, takeLatest} from 'redux-saga/effects';

import {endpoints} from '@src/constants/endpoints';
import {CLIENT_ID} from '@src/constants/auth';

import {SearchImageRequest, SearchImageState} from '@src/types/searchImage';
import {ApiOptions} from '@src/types/api';

import {setSearchImage, getSearchImage} from '../actions/searchImage';
import {setIsLoading} from '../actions/loadingIndicator';

import api from '../sagas/api/api';

export function* fetchSearchImage({payload}: {payload: SearchImageRequest}) {
  yield put(setIsLoading(true));

  const {page, query = ''} = payload;

  const searchImageApiConfig: ApiOptions = {
    path: `${endpoints.api.SEARCH_IMAGE}?page=${page}&query=${query}&client_id=${CLIENT_ID}`,
    method: 'GET',
  };

  const resultSearchImage: SearchImageState['resultSearchImage'] = yield call(
    api,
    searchImageApiConfig,
  );

  if (resultSearchImage?.status === 200) {
    yield put(setSearchImage(resultSearchImage));
  }

  yield put(setIsLoading(false));
}

export default function* searchImageSaga() {
  yield takeLatest(getSearchImage, fetchSearchImage);
}
