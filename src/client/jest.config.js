module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  collectCoverage: true,
  coverageReporters: ['html'],
  setupTestFrameworkScriptFile: '<rootDir>/src/test-setup.ts',
};
