/// <reference types="Cypress" />
import logger from '../helpers/logger';

describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/').get('main').injectAxe();
  });

  it('Has no detectable accessibility violations on load', () => {
    cy.checkA11y(null, null, logger);
  });
});
