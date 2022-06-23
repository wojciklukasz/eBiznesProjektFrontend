describe('Page load test', () => {
    it('Visits products page', () => {
        cy.visit('http://localhost:3000/products')
    })

    it('Checks if products page loads correctly', () => {
        cy.contains('Produkt')
        cy.contains('Cena')
        cy.get('nav').should('exist')
    })
})

describe('Products list test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/products')
    })

    it('Checks if products list is not empty', () => {
        cy.get('.products-list').should('have.length.gt', 0)
    })

    it('Checks if correct sample products are loaded', () => {
        cy.get(':nth-child(1) > .product-details').should('contain', 'Lipton')
        cy.get(':nth-child(1) > .product-details > .product-price').should('contain', '15')
        cy.get(':nth-child(1) > .product-details > .add-to-basket').should('exist')
        cy.get('.products-list').last().should('contain', 'Romet')
        cy.get('.products-list').last().should('contain', '1400')
        cy.get('.products-list').last().get('.add-to-basket').last().should('exist')
    })
})

describe('Check if link to details works', () => {
    it('Clicks on Lipton hyperlink', () => {
        cy.visit('http://localhost:3000/products')
        cy.get(':nth-child(1) > .product-details > .product-name').click()
        cy.get('.product-description').should('exist')
    })
})