class CheckoutPage {

    enterUserInfo(first, last, zip) {
      cy.get('[data-test="firstName"]').type(first)
      cy.get('[data-test="lastName"]').type(last)
      cy.get('[data-test="postalCode"]').type(zip)
    }
  
    continueCheckout() {
      cy.get('[data-test="continue"]').click()
    }
  
    verifySummary() {
      cy.get('.summary_total_label').should('be.visible')
      cy.get('.summary_tax_label').should('be.visible')
    }

    verifySummary(expectedItems) {
        cy.get('.cart_item').should('have.length', expectedItems.length)
        
        expectedItems.forEach((item, index) => {
            cy.get('.cart_item').eq(index).within(() => {
                cy.get('.inventory_item_name').should('have.text', item.name)
                cy.get('.inventory_item_price').should('have.text', item.price)
            })
        })
    }

    verifyTotals(expectedSubtotal, expectedTax, expectedTotal) {
        cy.get('.summary_subtotal_label')
          .should('contain.text', `Item total: ${expectedSubtotal}`)
        cy.get('.summary_tax_label')
          .should('contain.text', `Tax: ${expectedTax}`)
        cy.get('.summary_total_label')
          .should('contain.text', `Total: ${expectedTotal}`)
    }
  
    finishCheckout() {
      cy.get('[data-test="finish"]').click()
    }
  
    verifyOrderSuccess() {
      cy.get('.complete-header')
        .should('contain', 'Thank you for your order')
    }
  }
  
  export default new CheckoutPage()
  