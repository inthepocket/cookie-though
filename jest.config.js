module.exports = {
  preset: 'jest-preset-preact',
  setupFiles: [
    '<rootDir>/src/tests/__mocks__/setupTests.ts',
    '<rootDir>/src/tests/__mocks__/browserMocks.ts',
  ],
  testURL: 'http://localhost:8080',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/__mocks__/fileMocks.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageReporters: ['cobertura'],
  coveragePathIgnorePatterns: ['<rootDir>/src/index.ts', '<rootDir>/src/types.ts'],
};
