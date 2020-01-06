module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '.*\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/test-utils.js']
}
