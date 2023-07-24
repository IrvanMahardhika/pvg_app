module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(victory|@react-native|@react-navigation|react-native|react-native-splash-screen|rn-fetch-blob))',
  ],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/styles/**',
    '!**/types/**',
    '!**/*.styles.ts',
    '!App.tsx',
  ],
  rootDir: './',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 60,
      statements: 60,
    },
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
