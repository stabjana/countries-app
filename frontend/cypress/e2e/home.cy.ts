import '@testing-library/cypress/add-commands';
import '../support/commands';

describe("Countries Application", () => {  
    beforeEach(() => {
        cy.visit("/");
    });
    it("displays the nav bar correctly", () => {
        cy.findByRole("banner").should("exist");
        cy.findByRole("link", {name:"Home"}).should("exist");
    });
    it("Shows a list of countries", () => {
        cy.findByRole('link', { name: "All Countries"}).click();
        cy.url().should('include', '/countries');
    });
    it("should display the country detail page", () => {
        cy.findByRole('link', { name: "Afghanistan"}).click();
        cy.url().should('include', '/country/Afghanistan');
    });
});