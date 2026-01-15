class LoginPage {

    visit() {
      cy.visit('https://www.saucedemo.com/')
    }
  
    enterUsername(username) {
      cy.get('[data-test="username"]')
        .should('be.visible')
        .clear()
        .type(username)
    }
  
    enterPassword(password) {
      cy.get('[data-test="password"]')
        .should('be.visible')
        .clear()
        .type(password)
    }
  
    clickLogin() {
      cy.get('[data-test="login-button"]')
        .should('be.enabled')
        .click()
    }
  
    verifyLoginSuccess() {
      cy.url().should('include', '/inventory.html')
      cy.get('.title').should('contain', 'Products')
    }
  
    verifyLoginError() {
      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Username and password do not match')
    }
  }
  
  export default new LoginPage()
  