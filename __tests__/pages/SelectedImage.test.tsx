import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';

import SelectedImagePage from '@src/pages/SelectedImage/SelectedImage';

import {store} from '@src/redux/store';

import {SearchImageItem} from '@src/types/searchImage';
import {RootStackParamType, routesEnum} from '@src/types/rootStackParam';

const navigate = jest.fn();
const goBack = jest.fn();

const navigation = {
  navigate: navigate as unknown,
  goBack: goBack as unknown,
} as NativeStackNavigationProp<
  RootStackParamType,
  routesEnum.SELECTED_IMAGE_PAGE
>;

const component = ({
  mockSelectedImage,
}: {
  mockSelectedImage: SearchImageItem;
}) => (
  <Provider store={store}>
    <SelectedImagePage
      navigation={navigation}
      route={{params: {selectedImage: mockSelectedImage}}}
    />
  </Provider>
);

const MOCK_IMAGE: SearchImageItem = {
  id: '5S1S3MtQVyQ',
  width: 6000,
  height: 4000,
  description: 'a woman in a pink shirt hugging another woman',
  alt_description: 'a woman in a pink shirt hugging another woman',
  urls: {
    regular:
      'https://images.unsplash.com/photo-1674574124340-c00cc2dae99c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw&ixlib=rb-4.0.3&q=80&w=1080',
    small:
      'https://images.unsplash.com/photo-1674574124340-c00cc2dae99c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw&ixlib=rb-4.0.3&q=80&w=400',
  },
  links: {
    download:
      'https://unsplash.com/photos/5S1S3MtQVyQ/download?ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw',
    download_location:
      'https://api.unsplash.com/photos/5S1S3MtQVyQ/download?ixid=M3w0Nzg3NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDIzMDA0Nnw',
  },
  user: {
    name: 'Susan G. Komen 3-Day',
  },
};

describe('Selected Image page', () => {
  it('Renders correctly', () => {
    const {getByTestId} = render(component({mockSelectedImage: MOCK_IMAGE}));

    const selectedImage = getByTestId('selected-image');
    expect(selectedImage.props.source).toEqual({uri: MOCK_IMAGE.urls.regular});

    const selectedImageDescription = getByTestId('selected-image-description');
    expect(selectedImageDescription.props.children).toEqual(
      MOCK_IMAGE.description,
    );

    const selectedImageAuthor = getByTestId('selected-image-author');
    expect(selectedImageAuthor.props.children).toEqual(MOCK_IMAGE.user.name);
  });

  it('Pressing overlay layer will navigate back', () => {
    const {getByTestId} = render(component({mockSelectedImage: MOCK_IMAGE}));

    const overlayLayer = getByTestId('overlay-layer');
    fireEvent.press(overlayLayer);

    expect(goBack).toBeCalled();
  });
});
