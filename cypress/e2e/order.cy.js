/* eslint-disable cypress/no-unnecessary-waiting */
describe('Visit with empty basket', () => {
    it('Visits page with empty basket', () => {
        cy.visit('http://localhost:3000/order')
    })

    it('Checks if error message is correct', () => {
        cy.get('.empty-basket-message').should('exist')
        cy.contains('Koszyk jest pusty!')
    })
})

describe('Try to buy without logging in', () => {
    it('Adds item to basket', () => {
        cy.visit('http://localhost:3000/products')
        cy.get(':nth-child(2) > .product-details > .add-to-basket').click()
        cy.get('[href="/basket"]').click()
    })

    it('Tries to continue without logging in', () => {
        cy.get('[href="/order"]').click()
        cy.get('.login-error-message').should('exist')
    })
})

describe('Create successful order', () => {
    it('Simulates oAuth login', () => {
        cy.visit('http://localhost:3000')
        cy.login()
        cy.wait(350)
        cy.reload()
        cy.wait(350)
    })

    it('Adds product to a basket', () => {
        cy.get('[href="/products"]').click()
        cy.get(':nth-child(1) > .product-details > .add-to-basket').click()
        cy.get('[href="/basket"]').click()
    })

    it('Continues to order form', () => {
        cy.get('[href="/order"]').click()
        cy.get('.input-form').should('exist')
    })

    it('Checks if page is loaded correctly', () => {
        cy.get('.name').should('exist')
        cy.get('.surname').should('exist')
        cy.get('.road').should('exist')
        cy.get('.nr').should('exist')
        cy.get('.code').should('exist')
        cy.get('.city').should('exist')
        cy.get('.phone').should('exist')
        cy.get('.submit-button').should('exist')
    })

    it('Fills out an order form and continues', () => {
        cy.get('.name').type('Adam')
        cy.get('.surname').type('Nowak')
        cy.get('.road').type('Nowakowska')
        cy.get('.nr').type('12b')
        cy.get('.code').type('30-333')
        cy.get('.city').type('Nibylandia')
        cy.get('.phone').type('123456789')
    })

    it('Checks if card form loads correctly', () => {
        cy.get('.submit-button').click()
        cy.get('.__PrivateStripeElement > iframe').should('exist')
        cy.get('#submit').should('exist')
    })
})

describe('Check if value errors in form work', () => {
    it('Simulates oAuth login', () => {
        cy.visit('http://localhost:3000/basket')
        cy.login()
        cy.wait(300)
        cy.reload()
        cy.wait(300)
    })

    it('Adds product to a basket', () => {
        cy.get('[href="/products"]').click()
        cy.get(':nth-child(2) > .product-details > .add-to-basket').click()
        cy.get('[href="/basket"]').click()
    })

    it('Continues to order form', () => {
        cy.get('[href="/order"]').click()
        cy.get('.input-form').should('exist')
    })

    it('Checks if there is no initial error message', () => {
        cy.get('.error-message').should('be.empty')
    })

    it('Tries to submit empty form', () => {
        cy.get('.submit-button').click()
        cy.url().should('eq', 'http://localhost:3000/order')
    })

    it('Fills out fields without errors', () => {
        cy.get('.name').type('Adam')
        cy.get('.surname').type('Zly')
        cy.get('.road').type('Nowakowskiego')
        cy.get('.nr').type('12b')
        cy.get('.code').type('30-444')
        cy.get('.city').type('Nibybyt')
        cy.get('.phone').type('987654321')
    })

    it('Tries to submit invalid building number', () => {
        cy.get('.nr').clear().type('b12')
        cy.get('.submit-button').click()
        cy.get('.error-message').should('contain', 'Numer budynku')
        cy.get('.nr').clear().type('12b')
    })

    it('Tries to submit invalid post code', () => {
        cy.get('.code').clear().type('333-33')
        cy.get('.submit-button').click()
        cy.get('.error-message').should('contain', 'Kod pocztowy')
        cy.get('.code').clear().type('30-333')
    })

    it('Tries to submit invalid phone number', () => {
        cy.get('.phone').clear().type('0123456789')
        cy.get('.submit-button').click()
        cy.get('.error-message').should('contain', 'Numer telefonu')
    })
})