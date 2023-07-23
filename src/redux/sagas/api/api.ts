import {call} from 'redux-saga/effects';

import {ApiOptions} from '@src/types/api';

import request from '@src/utils/request';

export default function* apiSaga(
  apiOptions: ApiOptions,
): Generator<unknown, unknown, Promise<unknown>> {
  let response = null;

  try {
    response = yield call(request, apiOptions);
  } catch (failedResponse) {
    console.log(failedResponse);
  }

  return response;
}
