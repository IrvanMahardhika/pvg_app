import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';

import useTheme from '@src/hooks/useTheme';
import useThemedStyles from '@src/hooks/useThemedStyles';

import {RootState} from '@src/redux/store';

import {LoadingIndicatorState} from '@src/types/loadingIndicator';

import LoadingIndicatorStyles from './loadingIndicator.styles';

const LoadingIndicator = () => {
  const styles = useThemedStyles(LoadingIndicatorStyles);

  const theme = useTheme();

  const {isLoading}: LoadingIndicatorState = useSelector(
    (state: RootState) => state.loadingIndicatorReducer,
  );

  if (isLoading) {
    return (
      <View style={styles.rootContainer}>
        <ActivityIndicator size={'large'} color={theme.colors.natural.black} />
      </View>
    );
  } else {
    return null;
  }
};

export default LoadingIndicator;
