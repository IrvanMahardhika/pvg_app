import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamType, routesEnum} from '@src/types/rootStackParam';

import SearchImagePage from '@src/pages/SearchImage/SearchImage';

const Stack = createNativeStackNavigator<RootStackParamType>();

const AppScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesEnum.SEARCH_IMAGE_PAGE}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routesEnum.SEARCH_IMAGE_PAGE}
        component={SearchImagePage}
      />
    </Stack.Navigator>
  );
};

export default AppScreens;
