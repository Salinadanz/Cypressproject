class InventoryPage {

    verifyOnInventoryPage() {
      cy.get('.title').should('contain', 'Products')
      cy.get('.inventory_item').should('have.length.at.least', 1)
    }

    verifyProductImagesLoaded() {
        cy.get('.inventory_item_img img').each(($img) => {
            // Check that image has a non-empty src and is loaded
            cy.wrap($img)
              .should('have.attr', 'src')         
              .and('not.be.empty')
            
            cy.wrap($img)
              .should(($el) => {
                  // naturalWidth > 0 means image is loaded
                  expect($el[0].naturalWidth, 'image has natural width').to.be.greaterThan(0)
              })
        })
    }
    

    sortHighToLow() {
      cy.get('[data-test="product-sort-container"]')
        .select('Price (high to low)')
    }

    verifyPriceSortedHighToLow() {
      cy.get('.inventory_item_price').then($prices => {

        const priceArray = [...$prices].map(el =>
          parseFloat(el.innerText.replace('$', ''))
        )

        const sorted = [...priceArray].sort((a, b) => b - a)

        expect(priceArray).to.deep.equal(sorted)
      })
    }

    addFirstProductToCart() {
      cy.get('.inventory_item').first().within(() => {

        cy.get('.inventory_item_name')
          .invoke('text')
          .as('selectedProduct')

        cy.get('button').click()
      })

      cy.get('.shopping_cart_badge')
        .should('have.text', '1')
    }

    goToCart() {
      cy.get('.shopping_cart_link').click()
    }

    // Get the name of first product
    getFirstProductName() {
      return cy.get('.inventory_item_name').first().invoke('text')
    }

    // Get the price of first product
    getFirstProductPrice() {
        return cy.get('.inventory_item_price').first().invoke('text')
    }
}

export default new InventoryPage()
