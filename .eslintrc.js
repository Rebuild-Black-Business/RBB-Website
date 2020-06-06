module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:prettier/recommended', // prettier must be last in order here to work correctly
  ],
  rules: {
    'cypress/no-unnecessary-waiting': 'warn',
  },
};
