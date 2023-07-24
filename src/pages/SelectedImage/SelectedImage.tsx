import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';

import useThemedStyles from '@src/hooks/useThemedStyles';

import {getDownloadImage} from '@src/redux/actions/downloadImage';

import {RootStackParamType, routesEnum} from '@src/types/rootStackParam';

import imagePath from '@src/utils/imagePath';

import SelectedImageStyles from './SelectedImage.styles';

type PageNavigationProp = NativeStackNavigationProp<
  RootStackParamType,
  routesEnum.SELECTED_IMAGE_PAGE
>;

interface PageProps {
  navigation: PageNavigationProp;
  route: {
    params: RootStackParamType[routesEnum.SELECTED_IMAGE_PAGE];
  };
}

const SelectedImage: React.FC<PageProps> = ({navigation, route: {params}}) => {
  const dispatch = useDispatch();

  const styles = useThemedStyles(SelectedImageStyles);

  const {selectedImage} = params;

  const isUseObjectFitContain = selectedImage.height > selectedImage.width;

  const handleDownloadImage = () => {
    dispatch(getDownloadImage({url: selectedImage.links.download_location}));
  };

  return (
    <TouchableWithoutFeedback
      testID="overlay-layer"
      onPress={() => navigation.goBack()}>
      <View style={styles.rootContainer}>
        <View style={styles.imageCard}>
          <Image
            testID="selected-image"
            style={[
              styles.imageContainer,
              isUseObjectFitContain
                ? styles.objectFitContain
                : styles.objectFitCover,
            ]}
            source={{uri: selectedImage?.urls.regular}}
          />
          <Text>Title : </Text>
          <Text
            testID="selected-image-description"
            numberOfLines={2}
            ellipsizeMode="head"
            style={styles.contentText}>
            {selectedImage?.description}
          </Text>
          <Text>Author:</Text>
          <Text testID="selected-image-author" style={styles.contentText}>
            {selectedImage?.user.name}
          </Text>
          <View style={styles.actionButtonSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDownloadImage}>
              <Image
                style={styles.actionButtonImage}
                source={imagePath.ICON_DOWNLOAD}
              />
            </TouchableOpacity>
            <View style={styles.socialMediaButtonSection}>
              <TouchableOpacity style={styles.socialMediaButton}>
                <Image
                  style={styles.actionButtonImage}
                  source={imagePath.INSTAGRAM_LOGO}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialMediaButton}>
                <Image
                  style={styles.actionButtonImage}
                  source={imagePath.FACEBOOK_LOGO}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectedImage;
