module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/tests/__mocks__/setupTests.ts'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(preact|preact-render-to-string)/)'],
  testEnvironmentOptions: {
    url: 'http://localhost:8080',
  },
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/preact/compat',
    '^react-dom$': '<rootDir>/node_modules/preact/compat',
    '^react-dom/test-utils$': '<rootDir>/node_modules/preact/test-utils',
    '^react/jsx-runtime$': '<rootDir>/node_modules/preact/jsx-runtime',
    '\\.(css|less|sass|scss)$': '<rootDir>/src/tests/__mocks__/fileMocks.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/__mocks__/fileMocks.ts',
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coveragePathIgnorePatterns: ['<rootDir>/src/index.ts', '<rootDir>/src/types.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};
