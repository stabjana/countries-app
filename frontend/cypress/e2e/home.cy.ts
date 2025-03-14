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
   /*  it("should display the country detail page", () => {
        // Wait for the country name to appear and then click it
        cy.contains("Afghanistan", { timeout: 10000 }).click();
    
        // Assert that the URL updates correctly
        cy.url().should("include", "/country/Afghanistan");
    
        // Verify that the country detail page displays the country name
        cy.contains("h3", "Afghanistan").should("exist");
    });     */
    
    it('shows list of countries', () => {
        cy.findByRole('link', { name: 'All Countries' }).click();
        cy.url().should('include', '/countries');
    });
    it('more than 200 countries are displayed', () => {
        cy.findByRole('link', { name: 'All Countries' }).click();
        cy.get('.MuiCard-root').should('have.length.greaterThan', 200);
    }
    );
});