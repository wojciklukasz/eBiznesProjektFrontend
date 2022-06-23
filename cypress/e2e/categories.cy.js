describe('Page load test', () => {
    it('Visits categories page', () => {
        cy.visit('http://localhost:3000/categories')
    })

    it('Checks if categories page is loaded correctly', () => {
        cy.get('.categories-page').should('exist')
        cy.get('nav').should('exist')
    })

    it('Checks if categories list is not empty', () => {
        cy.get('.categories-list').should('have.length.gt', 0)
    })
})

describe('Go to category details', () => {
    it('Clicks on first category', () => {
        cy.visit('http://localhost:3000/categories')
        cy.get(':nth-child(1) > .category-details > .category-name').click()
    })

    it('Checks if details are loaded correctly', () => {
        cy.get('.category-name').should('exist')
        cy.get('.category-description').should('exist')
    })
})

describe('Check if category details has products', () => {
    it('Goes to first category details', () => {
        cy.visit('http://localhost:3000/categories/1')
    })

    it('Checks if products list is not empty', () => {
        cy.get('.products-in-category-list').should('have.length.gt', 0)
    })

    it('Clicks on first product in the list', () => {
        cy.get(':nth-child(1) > pre > .product-name').click()
    })

    it('Checks if product details are loaded', () => {
        cy.get('.product-name').should('exist')
        cy.get('.add-to-basket').should('exist')
    })
})