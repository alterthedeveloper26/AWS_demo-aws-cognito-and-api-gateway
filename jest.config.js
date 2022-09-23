module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~auth/(.*)': '<rootDir>/modules/auth/$1',
    '^~shared/(.*)': '<rootDir>/modules/shared/$1',
    '^~models/(.*)': '<rootDir>/modules/models/$1',
    '^~base/(.*)': '<rootDir>/base/$1',
    '^~common/(.*)': '<rootDir>/common/$1',
    '^~test/(.*)': '<rootDir>/test/$1',
    '^~/(.*)': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    'modules/**/*.service.ts',
    'modules/**/*.controller.ts',
    'common/**/*',
    'main.ts',
    // will add more paths...
  ],
  //   coverageThreshold: {
  //     global: {
  //       branches: 95,
  //       functions: 95,
  //       lines: 95,
  //       statements: 95
  //     }
  //   },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: '../coverage'
};
