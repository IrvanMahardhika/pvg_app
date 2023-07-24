import {SearchImageItem} from '@src/types/searchImage';

export enum routesEnum {
  SEARCH_IMAGE_PAGE = 'SearchImagePage',
  SELECTED_IMAGE_PAGE = 'SelectedImagePage',
}

export type RootStackParamType = {
  [routesEnum.SEARCH_IMAGE_PAGE]: undefined;
  [routesEnum.SELECTED_IMAGE_PAGE]: {
    selectedImage: SearchImageItem;
  };
};
