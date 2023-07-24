import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@src/redux/store';

import LoadingIndicator from '@src/components/loadingIndicator/loadingIndicator';

import useTheme from '@src/hooks/useTheme';

import Router from '@src/routes/indexRoutes';

import ThemeProvider from '@src/styles/themeProvider';

function App(): JSX.Element {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaView style={[theme.layout.appContainer]}>
          <StatusBar
            translucent
            backgroundColor={theme.layout.statusBar.backgroundColor}
            barStyle={theme.layout.statusBar.barStyle}
          />
          <Router />
          <LoadingIndicator />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
