/// <reference types="Cypress" />

describe('Error Boundary tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Render the children when there is nothing to complain about', () => {
    cy.get('main').should('be.visible');
  });
});
