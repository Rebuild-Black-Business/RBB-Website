/// <reference types="Cypress" />

describe('Navigation tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Clicking "About" navigates user to the about page', () => {
    cy.get("a[href$='/about']").click();

    cy.url().should('include', '/about');
  });

  it('Clicking "Businesses In Need" navigates user to the businesses-in-need page', () => {
    cy.get("a[href$='/businesses-in-need']").click();

    cy.url().should('include', '/businesses-in-need');
  });

  it('Clicking "Resources" navigates user to the resources page', () => {
    cy.get("a[href$='/resources']").click();

    cy.url().should('include', '/resources');
  });

  it('Clicking "Allies" navigates user to the allies page', () => {
    cy.get("a[href$='/allies']").click();

    cy.url().should('include', '/allies');
  });
});
