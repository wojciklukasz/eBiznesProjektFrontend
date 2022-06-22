describe('Navigation test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Clicks on Strona Główna hyperlink', () => {
        cy.get('[href="/"]').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Clicks on Produkty hyperlink', () => {
        cy.get('[href="/products"]').click()
        cy.url().should('eq', 'http://localhost:3000/products')
    })

    it('Clicks on Koszyk hyperlink', () => {
        cy.get('[href="/basket"]').click()
        cy.url().should('eq', 'http://localhost:3000/basket')
    })
})

describe('Check if correct navbar is displayed when not logged in', () => {
    it('Checks if login hyperlink exists', () => {
        cy.visit('http://localhost:3000')
        cy.get('[href="/login"]').should('exist')
        cy.contains('Witaj').should('not.exist')
    })
})

describe('Check if login hyperlink works', () => {
    it('Clicks on Logowanie hyperlink', () => {
        cy.get('[href="/login"]').click()
        cy.url().should('contain', 'login')
        cy.contains('Google')
    })
})