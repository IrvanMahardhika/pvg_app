import {createAction} from '@reduxjs/toolkit';

import {GET_DOWNLOAD_IMAGE} from './actionsList';

export const getDownloadImage = createAction<{url: string}>(GET_DOWNLOAD_IMAGE);
