module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'cypress/no-unnecessary-waiting': [0],
  },
};
