import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {Theme} from '@src/types/theme';

export default (theme: Theme) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.transparent.blueTransparent,
    },
    imageCard: {
      width: '90%',
      height: moderateScale(600),
      padding: moderateScale(20),
      backgroundColor: theme.colors.natural.white,
      borderRadius: moderateScale(4),
      borderColor: theme.colors.accent.border,
      borderWidth: moderateScale(1),
      borderStyle: 'solid',
    },
    imageContainer: {
      width: '100%',
      height: moderateScale(400),
      borderRadius: moderateScale(4),
    },
    objectFitContain: {objectFit: 'contain'},
    objectFitCover: {objectFit: 'cover'},
    contentText: {
      marginLeft: moderateScale(10),
      ...theme.typography.bold,
    },
    actionButtonSection: {
      marginTop: moderateScale(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    socialMediaButtonSection: {flexDirection: 'row'},
    actionButton: {
      width: moderateScale(30),
      height: moderateScale(30),
      padding: moderateScale(5),
      marginHorizontal: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(15),
      borderColor: theme.colors.natural.black,
      borderWidth: moderateScale(1),
      borderStyle: 'solid',
    },
    actionButtonImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    socialMediaButton: {
      width: moderateScale(30),
      height: moderateScale(30),
      marginHorizontal: moderateScale(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
