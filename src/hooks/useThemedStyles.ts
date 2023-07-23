import useTheme from './useTheme';

const useThemedStyles = (styles: Function) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
