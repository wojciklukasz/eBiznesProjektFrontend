describe('Page load test', () => {
    it('visits basket page', () => {
        cy.visit('http://localhost:3000/basket')
    })

    it('Checks if basket page is loaded correctly', () => {
        cy.contains('Produkt')
        cy.contains('Ilość')
        cy.get('nav').should('exist')
    })
})

describe('Check if initial basket is empty', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/basket')
    })

    it('Checks if initial basket is empty', () => {
        cy.get('.products-list > .product').should('not.exist')
    })

    it('Checks if initial price is equal to 0', () => {
        cy.get('.products-cost').should('contain', ' 0')
    })
})

describe('Check adding to basket with single product', () => {
    it('Adds Lipton to basket', () => {
        cy.visit('http://localhost:3000/products')
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
    })

    it('Checks if Lipton has been added to the basket', () => {
        cy.get('[href="/basket"]').click()
        cy.get('.product-name').should('contain', 'Lipton Yellow Label')
    })

    it('Checks if price and quantity are correct', () => {
        cy.get('.product-price').invoke('text').should('eq', '15')
        cy.get('.product-quantity').invoke('text').should('eq', '1')
    })

    it('Checks if all costs are correct', () => {
        cy.get('.products-cost').should('contain', '15')
        cy.get('.shipping-cost').should('contain', '14')
        cy.get('.total-cost').should('contain', '29')
    })
})

describe('Add multiple products to basket', () => {
    it('Adds Lipton 2 times', () => {
        cy.visit('http://localhost:3000/products')
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
    })

    it('Adds Romet Gazela', () => {
        cy.get(':nth-child(3) > .product-details > .add-to-basket').click()
    })

    it('Checks if there are 2 bags of Lipton in the basket', () => {
        cy.get('[href="/basket"]').click()
        cy.get(':nth-child(1) > .product-details > .product-quantity').invoke('text').should('eq', '2')
    })

    it('Checks if Romet Gazela is in the basket', () => {
        cy.get(':nth-child(2) > .product-details > .product-name').invoke('text').should('eq', 'Romet Gazela')
    })

    it('Checks if cost is correct', () => {
        cy.get('.products-cost').should('contain', '1880')
        cy.get('.total-cost').should('contain', '1894')
    })
})

describe('Remove single product from basket', () => {
    it('Adds Lipton 2 times', () => {
        cy.visit('http://localhost:3000/products')
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
    })

    it('Removes one Lipton', () => {
        cy.get('[href="/basket"]').click()
        cy.get('.remove-from-basket').click()
    })

    it('Checks if values are correct', () => {
        cy.get(':nth-child(1) > .product-details > .product-quantity').invoke('text').should('eq', '1')
        cy.get('.products-cost').should('contain', '15')
        cy.get('.total-cost').should('contain', '29')
    })
})

describe('Remove all items from basket', () => {
    it('Adds Lipton to basket', () => {
        cy.visit('http://localhost:3000/products')
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
    })

    it('Removes Lipton', () => {
        cy.get('[href="/basket"]').click()
        cy.get('.remove-from-basket').click()
    })

    it('Checks if cost is back to 0', () => {
        cy.get('.products-cost').should('contain', '0')
    })

    it('Checks if Do Kasy hyperlink is not visible', () => {
        cy.get('[href="/order/"]').should('not.exist')
    })
})