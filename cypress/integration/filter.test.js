/// <reference types="Cypress" />

describe('Business Screen', () => {
  const LOCATION = 'San Francisco';

  beforeEach(() => {
    cy.visit('/businesses');
  });

  it('Filtering Businesses will show a Signup form when there are no results', () => {
    // Fill and Submit the form
    cy.get('#need').selectNth(1);
    cy.get('#type').selectNth(1);
    cy.get('#location').click().type(`${LOCATION}{enter}`);

    // Check for the things we want to see
    cy.get("[data-testid='heading']").contains(
      /Sorry, no businesses matched this search/i
    );
    cy.get("[data-testid='subheading']").as('subheading');
    cy.get('@subheading').contains(LOCATION);

    // TODO: Look for some form and assert
  });
});

describe('Allies Screen', () => {
  const ZIP = '29407';
  beforeEach(() => {
    cy.visit('/allies');
  });

  it('Filtering Allies will show a Signup form when there are no results', () => {
    // Fill and Submit the form
    cy.get('#skill').selectNth(1);
    cy.get('#location').click().type(`${ZIP}{enter}`);

    // Check for the things we want to see
    cy.get("[data-testid='heading']").contains(
      /Sorry, no allies matched this search/i
    );
    cy.get("[data-testid='subheading']").as('subheading');
    cy.get('@subheading').contains(ZIP);

    // TODO: Look for some form and assert
  });
});
