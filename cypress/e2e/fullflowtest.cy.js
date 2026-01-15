import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"

describe('SauceDemo Full E2E Flow', () => {

  it('Full Test:Login → Inventory → Cart → Checkout', () => {
    cy.fixture('users').then(users => {

      // Login flow
      cy.visit('https://www.saucedemo.com/')
      cy.login(users.invalidUser.username, users.invalidUser.password)
      cy.login(users.validUser.username, users.validUser.password)
      LoginPage.verifyLoginSuccess()

      // Inventory flow
      InventoryPage.verifyOnInventoryPage()
      InventoryPage.verifyProductImagesLoaded()
      InventoryPage.sortHighToLow()
      InventoryPage.verifyPriceSortedHighToLow()
      InventoryPage.getFirstProductName().then(productName => {
        InventoryPage.getFirstProductPrice().then(productPrice => {
          InventoryPage.addFirstProductToCart()
          InventoryPage.goToCart()
  
    // Cart flow
          CartPage.verifyCartPage()
          CartPage.verifyProductInCart(productName) //verify productname
          CartPage.verifyProductPriceInCart(productPrice)  // verify price
          CartPage.clickCheckout()
    
    // Checkout flow
          CheckoutPage.enterUserInfo(
            users.standardUser.firstName,
            users.standardUser.lastName,
            users.standardUser.postalCode
          )
          CheckoutPage.continueCheckout()
          const expectedItems = [
            { name: productName, price: productPrice }
        ]
        
          CheckoutPage.verifySummary(expectedItems)
          CheckoutPage.verifyTotals('$49.99', '$4.00', '$53.99')
          CheckoutPage.finishCheckout()
          CheckoutPage.verifyOrderSuccess()
        })
      })
    })
  })
})



