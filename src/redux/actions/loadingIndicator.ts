import {createAction} from '@reduxjs/toolkit';

import {SET_IS_LOADING} from './actionsList';

export const setIsLoading = createAction<boolean>(SET_IS_LOADING);
