/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('New My Youtube', () => {
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, { fixture: 'popular.json' });
    cy.intercept('GET', /(search)/g, { fixture: 'search.json' });
    cy.viewport(1200, 800);
    cy.visit('/');
  });

  it('display logo', () => {
    cy.findByText('너튜브').should('exist');
  });

  it('shows popular videos first', () => {
    cy.findByText('Popular Video').should('exist');
  });

  it('searches by keyword', () => {
    cy.findByPlaceholderText('Search...').type('bts');
    cy.findByRole('button').click();
    cy.findByText('Search Result1').should('exist');
  });

  it('goes to detail page', () => {
    cy.findAllByRole('listitem').first().click();
    cy.findByTitle('Popular Video').should('exist');
    cy.findByText('Popular Video').should('exist');
    cy.findByText('Search Result1').should('exist');
  });
});
