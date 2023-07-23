import {ColorValue} from 'react-native';

export type Theme = {
  colors: Record<string, Record<string, ColorValue>>;
  layout: Record<string, Record<string, any>>;
  typography: Record<string, any>;
};
