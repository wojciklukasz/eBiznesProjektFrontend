describe('Page load test', () => {
    it('Checks if main page loads correctly', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Sklep na eBiznes')
    })

    it('Checks if description is present', () => {
        cy.get('.description').should('exist')
    })
})

describe('Navigation bar load test', () => {
    it('Checks if navigation bar is loaded', () => {
        cy.get('nav').should('exist')
        cy.get('[href="/"]').should('exist')
    })
})