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

import {getSearchImage, setSearchImage} from '@src/redux/actions/searchImage';
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

  const {resultSearchImage}: SearchImageState = useSelector(
    (state: RootState) => state.searchImageReducer,
  );

  const [completeSearchImageList, setCompleteSearchImageList] = useState<
    SearchImageItem[]
  >([]);

  const [queryForFetchingSearchImage, setQueryForFetchingSearchImage] =
    useState<string>('');

  const [pageForFetchingSearchImage, setPageForFetchingSearchImage] =
    useState<number>(1);

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

  const handleOnEndReached = () => {
    if (
      resultSearchImage?.data.total_pages &&
      pageForFetchingSearchImage < resultSearchImage?.data.total_pages
    ) {
      const page = pageForFetchingSearchImage + 1;
      dispatch(getSearchImage({page, query: queryForFetchingSearchImage}));
      setPageForFetchingSearchImage(page);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallback = useCallback(
    debounce((value: string) => {
      setCompleteSearchImageList([]);
      setPageForFetchingSearchImage(1);
      dispatch(getSearchImage({page: 1, query: value}));
    }, 1000),
    [],
  );

  const handleInputChange = (value: string) => {
    setQueryForFetchingSearchImage(value);

    if (value.length === 0) {
      setCompleteSearchImageList([]);
      dispatch(setSearchImage(undefined));
    } else {
      debounceCallback(value);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.textInputContainer}>
        <Text>Search Image : </Text>
        <TextInput
          inputMode="text"
          style={styles.textInput}
          onChangeText={handleInputChange}
        />
      </View>
      {completeSearchImageList.length > 0 && (
        <FlatList
          testID="search-image-list"
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={completeSearchImageList}
          keyExtractor={item => `${item.id}`}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0}
          renderItem={({item}) => {
            return (
              <View style={styles.imageCardWrapper}>
                <TouchableWithoutFeedback
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
      )}
    </View>
  );
};

export default SearchImage;
