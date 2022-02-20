import "cypress-audit/commands";

Cypress.Commands.add('seed', (data) => {
    cy.visit('http://localhost:3000/add')
    cy.get('#title')
      .type(data)
    cy.get('.btn-success')
      .click()
})