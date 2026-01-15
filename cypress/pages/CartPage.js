class CartPage {

    verifyCartPage() {
      cy.url().should('include', 'cart.html')
      cy.get('.title').should('contain', 'Your Cart')
    }
  
    // Verify the product name from inventory page
    verifyProductInCart(productName) {
        cy.get('.inventory_item_name')
          .should('have.text', productName) // exact match
    }

    // Verify the product price from inventory page
    verifyProductPriceInCart(expectedPrice) {
        cy.get('.inventory_item_price').first().should('have.text', expectedPrice)
    }    
  
    // Click checkout button
    clickCheckout() {
      cy.get('[data-test="checkout"]').click()
    }
  }
  
  export default new CartPage()
  