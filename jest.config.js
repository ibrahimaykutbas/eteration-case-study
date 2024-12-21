module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    //'node_modules/(?!react-native|@react-navigation|@react-native|react-native-device-info)'
    'node_modules/(?!((react-native)|' +
      '(@react-native)|' +
      '(react-navigation)|' +
      '(@react-navigation)|' +
      '(react-native-elements)|' +
      '(react-redux)|' +
      '(redux)|' +
      '(@reduxjs/toolkit)|' +
      '(react-native-device-info)))'
  ],
  moduleNameMapper: {
    '\\.png$': '<rootDir>/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/__mocks__/fileMock.js'
  }
}
