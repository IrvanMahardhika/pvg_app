import ReactNativeBlobUtil from 'react-native-blob-util';

import {isAndroid} from '@src/utils/reactNative';

export const downloadFileFromBase64String = async (base64string: string) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const fileName = `image-${currentTimestamp}.png`;
  const filePath = isAndroid
    ? '/storage/emulated/0/Download'
    : ReactNativeBlobUtil.fs.dirs.DocumentDir;
  const fileLocation = `${filePath}/${fileName}`;
  await ReactNativeBlobUtil.fs.createFile(fileLocation, base64string, 'base64');
};
