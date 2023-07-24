import {createAction} from '@reduxjs/toolkit';

import {
  SearchImageState,
  SearchImageRequest,
  ListImageRequest,
} from '@src/types/searchImage';

import {
  GET_SEARCH_IMAGE,
  SET_SEARCH_IMAGE,
  SET_LIST_IMAGE,
  GET_LIST_IMAGE,
} from './actionsList';

export const getListImage = createAction<ListImageRequest>(GET_LIST_IMAGE);
export const setListImage =
  createAction<SearchImageState['resultListImage']>(SET_LIST_IMAGE);

export const getSearchImage =
  createAction<SearchImageRequest>(GET_SEARCH_IMAGE);
export const setSearchImage =
  createAction<SearchImageState['resultSearchImage']>(SET_SEARCH_IMAGE);
