/// <reference types="Cypress" />

describe('Header Navigation tests, non-mobile', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Clicking "About" navigates user to the about page', () => {
    cy.get('#navigation').findByText(/about/i).click();

    cy.url().should('include', '/about');
  });

  it('Clicking "Businesses" navigates user to the businesses page', () => {
    cy.get('#navigation')
      .findByText(/businesses/i)
      .click();

    cy.url().should('include', '/businesses');
  });

  it('Clicking "Allies" navigates user to the allies page', () => {
    cy.get('#navigation')
      .findByText(/allies/i)
      .click();

    cy.url().should('include', '/allies');
  });
});
