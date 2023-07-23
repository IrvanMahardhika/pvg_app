import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import {RootStackParamType} from '@src/types/rootStackParam';

import AppScreens from './appScreens';

export const navigationRef = createNavigationContainerRef<RootStackParamType>();

const Router = () => {
  useEffect(() => {
    if (navigationRef.isReady()) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppScreens />
    </NavigationContainer>
  );
};

export default Router;
