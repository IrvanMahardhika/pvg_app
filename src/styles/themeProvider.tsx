import React from 'react';

import {Theme} from '@src/types/theme';

import themes from './theme';

export const ThemeContext = React.createContext<Theme>(themes.default);

const ThemeProvider = ({children}: {children: any}) => {
  return (
    <ThemeContext.Provider value={themes.default}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
