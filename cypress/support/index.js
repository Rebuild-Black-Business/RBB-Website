// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-axe';
import '@testing-library/cypress/add-commands';

// Polyfill whatwg-fetch in test
import 'whatwg-fetch';

// Delete window.fetch on every window load so we can
// intercept tests using whatwg-fetch
Cypress.on('window:before:load', win => {
  delete win.fetch;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
