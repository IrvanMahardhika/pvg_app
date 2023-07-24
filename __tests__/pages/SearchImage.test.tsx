import React from 'react';
import {combineReducers, configureStore, createReducer} from '@reduxjs/toolkit';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import SearchImagePage from '@src/pages/SearchImage/SearchImage';

import reducers from '@src/redux/reducers';
import {
  setSearchImage,
  setListImage,
  getListImage,
  getSearchImage,
} from '@src/redux/actions/searchImage';
import {setIsLoading} from '@src/redux/actions/loadingIndicator';
import {loadingIndicatorState as baseLoadingIndicatorState} from '@src/redux/reducers/loadingIndicator';
import {baseSearchImageState} from '@src/redux/reducers/searchImage';

import {SearchImageState, SearchImageItem} from '@src/types/searchImage';
import {RootStackParamType, routesEnum} from '@src/types/rootStackParam';

jest.useFakeTimers();

const navigate = jest.fn();
const mockGetSearchImage = jest.fn();
const mockGetListImage = jest.fn();

const navigation = {
  navigate: navigate as unknown,
} as NativeStackNavigationProp<
  RootStackParamType,
  routesEnum.SEARCH_IMAGE_PAGE
>;

const mockReducers = ({
  mockResultListImage,
  mockResultSearchImage,
}: {
  mockResultListImage?: SearchImageState['resultListImage'];
  mockResultSearchImage?: SearchImageState['resultSearchImage'];
}) => {
  const searchImageReducer = createReducer(baseSearchImageState, builder => {
    builder.addCase(setSearchImage, (state, {payload}) => {
      return {...state, resultSearchImage: payload};
    });
    builder.addCase(getSearchImage, (state, {payload}) => {
      mockGetSearchImage(payload);
      return {...state, resultSearchImage: mockResultSearchImage};
    });
    builder.addCase(setListImage, (state, {payload}) => {
      return {...state, resultListImage: payload};
    });
    builder.addCase(getListImage, (state, {payload}) => {
      mockGetListImage(payload);
      return {...state, resultListImage: mockResultListImage};
    });
  });

  const loadingIndicatorReducer = createReducer(
    baseLoadingIndicatorState,
    builder => {
      builder.addCase(setIsLoading, (state, {payload}) => {
        return {...state, isLoading: payload};
      });
    },
  );

  const rootReducer = combineReducers({
    ...reducers,
    searchImageReducer,
    loadingIndicatorReducer,
  });

  return configureStore({
    reducer: rootReducer,
  });
};

const component = ({
  mockResultListImage,
  mockResultSearchImage,
}: {
  mockResultListImage?: SearchImageState['resultListImage'];
  mockResultSearchImage?: SearchImageState['resultSearchImage'];
}) => (
  <Provider
    store={mockReducers({
      mockResultListImage,
      mockResultSearchImage,
    })}>
    <SearchImagePage navigation={navigation} />
  </Provider>
);

const MOCK_IMAGE: SearchImageItem = {
  id: '5S1S3MtQVyQ',
  width: 6000,
  height: 4000,
  description: 'a woman in a pink shirt hugging another woman',
  alt_description: 'a woman in a pink shirt hugging another woman',
  urls: {
    regular:
      'https://images.unsplash.com/photo-1674574124340-c00cc2dae99c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw&ixlib=rb-4.0.3&q=80&w=1080',
    small:
      'https://images.unsplash.com/photo-1674574124340-c00cc2dae99c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw&ixlib=rb-4.0.3&q=80&w=400',
  },
  links: {
    download:
      'https://unsplash.com/photos/5S1S3MtQVyQ/download?ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw',
    download_location:
      'https://api.unsplash.com/photos/5S1S3MtQVyQ/download?ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw',
  },
  user: {
    name: 'Susan G. Komen 3-Day',
  },
};

describe('Search Image page', () => {
  it('Render only input field when data is empty', () => {
    const {queryByTestId} = render(component({}));

    const searchKeywordInputField = queryByTestId('search-keyword-input');
    expect(searchKeywordInputField).toBeTruthy();

    const listImageList = queryByTestId('list-image-list');
    expect(listImageList).toBeFalsy();

    const searchImageList = queryByTestId('search-image-list');
    expect(searchImageList).toBeFalsy();
  });

  it('Fetch and display list image list', () => {
    const dataLength = 10;
    const data = new Array(dataLength).fill(MOCK_IMAGE);
    const {getByTestId} = render(
      component({mockResultListImage: {status: 200, data}}),
    );

    expect(mockGetListImage).toBeCalledWith({page: 1});

    const listImageList = getByTestId('list-image-list');
    expect(listImageList).toBeTruthy();

    const firstListImageCard = getByTestId('list-image-card-0');
    fireEvent.press(firstListImageCard);
    expect(navigate).toBeCalledWith(routesEnum.SELECTED_IMAGE_PAGE, {
      selectedImage: data[0],
    });

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    fireEvent.scroll(listImageList, eventData);
    expect(mockGetListImage).toBeCalledWith({page: 2});
  });

  it('Fetch and display search image list based on keyword', async () => {
    const dataLength = 10;
    const data = new Array(dataLength).fill(MOCK_IMAGE);
    const {getByTestId, queryByTestId} = render(
      component({
        mockResultListImage: {status: 200, data},
        mockResultSearchImage: {
          status: 200,
          data: {total: 100, total_pages: 10, results: data},
        },
      }),
    );

    const searchKeyword = 'singapore!';
    const searchKeywordInputField = getByTestId('search-keyword-input');
    fireEvent.changeText(searchKeywordInputField, searchKeyword);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(mockGetSearchImage).toBeCalledWith({
        page: 1,
        query: searchKeyword,
      });
    });

    const searchImageList = getByTestId('search-image-list');
    expect(searchImageList).toBeTruthy();

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    fireEvent.scroll(searchImageList, eventData);
    expect(mockGetSearchImage).toBeCalledWith({
      page: 2,
      query: searchKeyword,
    });

    let firstSearchImageCard = queryByTestId('search-image-card-0');
    fireEvent.press(firstSearchImageCard!);
    expect(navigate).toBeCalledWith(routesEnum.SELECTED_IMAGE_PAGE, {
      selectedImage: data[0],
    });

    fireEvent.changeText(searchKeywordInputField, '');

    jest.advanceTimersByTime(1000);

    firstSearchImageCard = queryByTestId('search-image-card-0');
    expect(firstSearchImageCard).toBeFalsy();
  });
});
