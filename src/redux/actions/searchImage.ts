import {createAction} from '@reduxjs/toolkit';

import {SearchImageState, SearchImageRequest} from '@src/types/searchImage';

import {GET_SEARCH_IMAGE, SET_SEARCH_IMAGE} from './actionsList';

export const getSearchImage =
  createAction<SearchImageRequest>(GET_SEARCH_IMAGE);
export const setSearchImage =
  createAction<SearchImageState['resultSearchImage']>(SET_SEARCH_IMAGE);
