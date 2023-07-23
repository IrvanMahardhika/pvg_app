import {createReducer} from '@reduxjs/toolkit';

import {setIsLoading} from '../actions/loadingIndicator';

import {LoadingIndicatorState} from '@src/types/loadingIndicator';

export const loadingIndicatorState: LoadingIndicatorState = {
  isLoading: false,
};

const loadingIndicatorReducer = createReducer(
  loadingIndicatorState,
  builder => {
    builder.addCase(setIsLoading, (state, {payload}) => {
      return {...state, isLoading: payload};
    });
  },
);

export default loadingIndicatorReducer;
