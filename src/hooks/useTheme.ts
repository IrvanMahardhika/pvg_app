import {useContext} from 'react';

import {ThemeContext} from '@src/styles/themeProvider';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
