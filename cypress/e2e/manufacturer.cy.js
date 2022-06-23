describe('Page load test', () => {
    it('Visits categories page', () => {
        cy.visit('http://localhost:3000/manufacturers')
    })

    it('Checks if manufacturers page loads correctly', () => {
        cy.get('.manufacturers-page').should('exist')
        cy.get('nav').should('exist')
    })

    it('Checks if manufacturers list is not empty', () => {
        cy.get('.manufacturers-list').should('have.length.gt', 0)
    })
})

describe('Go to manufacturer details', () => {
    it('Clicks on first category', () => {
        cy.visit('http://localhost:3000/manufacturers')
        cy.get(':nth-child(1) > .manufacturer-details > .manufacturer-name').click()
    })

    it('Checks if details are loaded correctly', () => {
        cy.get('.manufacturer-name').should('exist')
        cy.get('.manufacturer-description').should('exist')
    })
})

describe('Check if manufacturer details has products', () => {
    it('Goes to first manufacturer details', () => {
        cy.visit('http://localhost:3000/manufacturers/1')
    })

    it('Checks if products list is not empty', () => {
        cy.get('.products-from-manufacturer-list').should('have.length.gt', 0)
    })

    it('Clicks on first product in the list', () => {
        cy.get(':nth-child(1) > pre > .product-name').click()
    })

    it('Checks if product details are loaded', () => {
        cy.get('.product-name').should('exist')
        cy.get('.add-to-basket').should('exist')
    })
})