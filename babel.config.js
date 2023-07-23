module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@redux': './src/redux',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@types': './src/types',
          '@shared-component': './storybook/stories',
        },
      },
    ],
  ],
};
