// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/vite-env.d.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coverageThreshold: { global: { branches: 100, functions: 100, lines: 100 } },
  moduleNameMapper: { '(.*?).?inline': '<rootDir>/test/inline-css.js' },
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-test-env.js'],
  testEnvironment: 'jsdom',
};
