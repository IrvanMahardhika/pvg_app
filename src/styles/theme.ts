import {Dimensions} from 'react-native';

import {Theme} from '@src/types/theme';

const defaultTheme: Theme = {
  typography: {
    bold: {
      fontWeight: 'bold',
    },
  },
  colors: {
    natural: {
      black: 'rgb(0, 0, 0)',
      white: 'rgb(255, 255, 255)',
    },
    accent: {
      border: 'rgb(227, 227, 227)',
    },
  },
  layout: {
    rootContainer: {
      flex: 1,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    appContainer: {
      flexGrow: 1,
      position: 'relative',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'dark-content',
    },
    window: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    screen: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    },
  },
};

export default {
  default: defaultTheme,
};
