import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {Theme} from '@src/types/theme';

export default (theme: Theme) =>
  StyleSheet.create({
    rootContainer: {
      ...theme.layout.rootContainer,
    },
    textInputContainer: {
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(5),
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(50),
      marginBottom: moderateScale(20),
      marginHorizontal: moderateScale(5),
      borderRadius: moderateScale(4),
      borderColor: theme.colors.accent.border,
      borderWidth: moderateScale(1),
      borderStyle: 'solid',
    },
    textInput: {flex: 1},
    imageCardWrapper: {
      width: '50%',
      padding: moderateScale(5),
      height: moderateScale(275),
    },
    imageCard: {
      height: '100%',
      width: '100%',
      padding: moderateScale(5),
      borderRadius: moderateScale(4),
      borderColor: theme.colors.accent.border,
      borderWidth: moderateScale(1),
      borderStyle: 'solid',
    },
    imageContainer: {
      width: '100%',
      height: moderateScale(150),
      borderRadius: moderateScale(4),
      objectFit: 'cover',
    },
    contentText: {
      marginLeft: moderateScale(10),
      ...theme.typography.bold,
    },
  });
