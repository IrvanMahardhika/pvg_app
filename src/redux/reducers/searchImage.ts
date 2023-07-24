import {createReducer} from '@reduxjs/toolkit';

import {setSearchImage, setListImage} from '../actions/searchImage';

import {SearchImageState} from '@src/types/searchImage';

export const baseSearchImageState: SearchImageState = {};

const searchImageReducer = createReducer(baseSearchImageState, builder => {
  builder.addCase(setSearchImage, (state, {payload}) => {
    return {...state, resultSearchImage: payload};
  });
  builder.addCase(setListImage, (state, {payload}) => {
    return {...state, resultListImage: payload};
  });
});

export default searchImageReducer;
