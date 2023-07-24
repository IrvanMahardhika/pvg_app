import {call, put, takeLatest} from 'redux-saga/effects';

import {endpoints} from '@src/constants/endpoints';
import {CLIENT_ID} from '@src/constants/auth';

import {
  ListImageRequest,
  SearchImageRequest,
  SearchImageState,
} from '@src/types/searchImage';
import {ApiOptions} from '@src/types/api';

import {
  setListImage,
  getListImage,
  setSearchImage,
  getSearchImage,
} from '../actions/searchImage';
import {setIsLoading} from '../actions/loadingIndicator';

import api from '../sagas/api/api';

export function* fetchListImage({payload}: {payload: ListImageRequest}) {
  yield put(setIsLoading(true));

  const {page} = payload;

  const listImageApiConfig: ApiOptions = {
    path: `${endpoints.api.LIST_IMAGE}?page=${page}&client_id=${CLIENT_ID}`,
    method: 'GET',
  };

  const resultListImage: SearchImageState['resultListImage'] = yield call(
    api,
    listImageApiConfig,
  );

  if (resultListImage?.status === 200) {
    yield put(setListImage(resultListImage));
  }

  yield put(setIsLoading(false));
}

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
  yield takeLatest(getListImage, fetchListImage);
  yield takeLatest(getSearchImage, fetchSearchImage);
}
