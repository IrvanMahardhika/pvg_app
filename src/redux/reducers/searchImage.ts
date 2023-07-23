import {createReducer} from '@reduxjs/toolkit';

import {setSearchImage} from '../actions/searchImage';

import {SearchImageState} from '@src/types/searchImage';

export const baseSearchImageState: SearchImageState = {};

const searchImageReducer = createReducer(baseSearchImageState, builder => {
  builder.addCase(setSearchImage, (state, {payload}) => {
    return {...state, resultSearchImage: payload};
  });
});

export default searchImageReducer;
