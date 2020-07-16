/// <reference types="Cypress" />

describe('Business Screen', () => {
  const LOCATION = 'San Francisco';
  const ZIP = '02215';

  beforeEach(() => {
    cy.visit('/businesses');
  });

  it('Filtering Businesses will show a Signup form when there are no results', () => {
    // Fill and Submit the form
    cy.get('#need').selectNth(1);
    cy.get('#type').selectNth(1);
    cy.get('#location').click().type(`${LOCATION}{enter}`);

    // Check for the things we want to see
    cy.findByTestId('heading');
    cy.findByTestId('subheading').as('subheading');

    // TODO check for location in message
    // cy.get('@subheading').should('contain', LOCATION);

    // TODO: Look for some form and assert
  });

  it("Leading 0's are not removed from ZIP code search", () => {
    cy.server();
    cy.route('https://maps.google.com/maps/api/geocode/*').as('googleApi');

    cy.get('#need').selectNth(1);
    cy.get('#type').selectNth(1);
    cy.get('#location').click().type(`${ZIP}{enter}`);

    // Make sure we redirect to the correct url and
    // Intercept the request and make sure it has the zip
    cy.url().should('contain', `location=${ZIP}`);
    cy.wait('@googleApi').then(req => {
      expect(req.url).to.contain(`address=${ZIP}`);
    });
  });
});

describe('Allies Screen', () => {
  beforeEach(() => {
    cy.visit('/allies');
  });

  it('Filtering Allies will show a Signup form when there are no results', () => {
    // Fill and Submit the form
    cy.findByTestId('toc-agree').click();
    cy.get('#skill').selectNth(1);

    // Check for the things we want to see
    cy.findByTestId('heading');
    cy.findByTestId('subheading').as('subheading');

    // TODO check for location in message
    // cy.get('@subheading').should('contain', ZIP);
    // const ZIP = '29407';
    // TODO: Look for some form and assert
  });
});
