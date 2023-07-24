import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {
  getListImage,
  getSearchImage,
  setSearchImage,
} from '@src/redux/actions/searchImage';
import {RootState} from '@src/redux/store';

import useThemedStyles from '@src/hooks/useThemedStyles';

import {RootStackParamType, routesEnum} from '@src/types/rootStackParam';
import {SearchImageState, SearchImageItem} from '@src/types/searchImage';

import {debounce} from '@src/utils/common';

import SearchImageStyles from './SearchImage.styles';

type PageNavigationProp = NativeStackNavigationProp<
  RootStackParamType,
  routesEnum.SEARCH_IMAGE_PAGE
>;

interface PageProps {
  navigation: PageNavigationProp;
}

const SearchImage: React.FC<PageProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const styles = useThemedStyles(SearchImageStyles);

  const {resultSearchImage, resultListImage}: SearchImageState = useSelector(
    (state: RootState) => state.searchImageReducer,
  );

  const [completeListImageList, setCompleteListImageList] = useState<
    SearchImageItem[]
  >([]);

  const [completeSearchImageList, setCompleteSearchImageList] = useState<
    SearchImageItem[]
  >([]);

  const [pageForFetchingListImage, setPageForFetchingListImage] =
    useState<number>(1);

  const [queryForFetchingSearchImage, setQueryForFetchingSearchImage] =
    useState<string>('');

  const [pageForFetchingSearchImage, setPageForFetchingSearchImage] =
    useState<number>(1);

  useEffect(() => {
    if (!queryForFetchingSearchImage) {
      dispatch(getListImage({page: pageForFetchingListImage}));
    }
  }, [dispatch, pageForFetchingListImage, queryForFetchingSearchImage]);

  useEffect(() => {
    if (resultListImage?.data) {
      setCompleteListImageList(prevList =>
        [...prevList, ...resultListImage?.data].filter(
          (thing, index, self) =>
            self.findIndex(t => t.id === thing.id) === index,
        ),
      );
    }
  }, [resultListImage?.data]);

  useEffect(() => {
    if (resultSearchImage?.data.results) {
      setCompleteSearchImageList(prevList =>
        [...prevList, ...resultSearchImage?.data.results].filter(
          (thing, index, self) =>
            self.findIndex(t => t.id === thing.id) === index,
        ),
      );
    }
  }, [resultSearchImage?.data.results]);

  const handleOnEndReachedForSearchImage = () => {
    if (
      resultSearchImage?.data.total_pages &&
      pageForFetchingSearchImage < resultSearchImage?.data.total_pages
    ) {
      const page = pageForFetchingSearchImage + 1;
      dispatch(getSearchImage({page, query: queryForFetchingSearchImage}));
      setPageForFetchingSearchImage(page);
    }
  };

  const handleOnEndReachedForListImage = () => {
    const page = pageForFetchingListImage + 1;
    setPageForFetchingListImage(page);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallback = useCallback(
    debounce((value: string) => {
      setCompleteSearchImageList([]);
      dispatch(setSearchImage(undefined));
      setPageForFetchingSearchImage(1);
      setCompleteListImageList([]);

      if (value.length === 0) {
        setPageForFetchingListImage(1);
      } else {
        dispatch(getSearchImage({page: 1, query: value}));
      }
    }, 1000),
    [],
  );

  const handleInputChange = (value: string) => {
    setQueryForFetchingSearchImage(value);
    debounceCallback(value);
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.textInputContainer}>
        <Text>Search Image : </Text>
        <TextInput
          testID="search-keyword-input"
          inputMode="text"
          style={styles.textInput}
          onChangeText={handleInputChange}
        />
      </View>
      {completeSearchImageList.length > 0 ? (
        <FlatList
          testID="search-image-list"
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={completeSearchImageList}
          keyExtractor={item => `${item.id}`}
          onEndReached={handleOnEndReachedForSearchImage}
          onEndReachedThreshold={0}
          renderItem={({item, index}) => {
            return (
              <View style={styles.imageCardWrapper}>
                <TouchableWithoutFeedback
                  testID={`search-image-card-${index}`}
                  onPress={() =>
                    navigation.navigate(routesEnum.SELECTED_IMAGE_PAGE, {
                      selectedImage: item,
                    })
                  }>
                  <View style={styles.imageCard}>
                    <Image
                      style={styles.imageContainer}
                      source={{uri: item.urls.small}}
                    />
                    <Text>Title : </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="head"
                      style={styles.contentText}>
                      {item.description}
                    </Text>
                    <Text>Author:</Text>
                    <Text style={styles.contentText}>{item.user.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          }}
        />
      ) : completeListImageList.length > 0 ? (
        <FlatList
          testID="list-image-list"
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={completeListImageList}
          keyExtractor={item => `${item.id}`}
          onEndReached={handleOnEndReachedForListImage}
          onEndReachedThreshold={0}
          renderItem={({item, index}) => {
            return (
              <View style={styles.imageCardWrapper}>
                <TouchableWithoutFeedback
                  testID={`list-image-card-${index}`}
                  onPress={() =>
                    navigation.navigate(routesEnum.SELECTED_IMAGE_PAGE, {
                      selectedImage: item,
                    })
                  }>
                  <View style={styles.imageCard}>
                    <Image
                      style={styles.imageContainer}
                      source={{uri: item.urls.small}}
                    />
                    <Text>Title : </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="head"
                      style={styles.contentText}>
                      {item.description}
                    </Text>
                    <Text>Author:</Text>
                    <Text style={styles.contentText}>{item.user.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default SearchImage;
