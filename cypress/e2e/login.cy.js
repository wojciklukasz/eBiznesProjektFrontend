/* eslint-disable cypress/no-unnecessary-waiting */
describe('Check if login page loads correctly', () => {
    it('Visits login page', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('.google').should('exist')
    })

    it('Checks if Google link exists', () => {
        cy.get('.google-link > a').should('exist')
    })

    it('Checks if GitHub link exists', () => {
        cy.get('.github-link > a').should('exist')
    })
})

describe('Check if site changes correctly after logging in and out', () => {
    it('Simulates logging in', () => {
        cy.visit('http://localhost:3000')
        cy.login()
        cy.wait(300)
        cy.reload()
        cy.wait(300)
        cy.get('[href="/logout"]').should('exist')
    })

    it('Logs out', () => {
        cy.get('[href="/logout"]').click()
        cy.get('[href="/logout"]').should('not.exist')
        expect(localStorage.getItem('email')).eq(null)
        expect(localStorage.getItem('token')).eq(null)
    })
})