describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should go to register page', () => {
    cy.findAllByText('Sign up').filter(':visible').first().click()
    cy.url().should('include', '/register')
  })

  it('should go to login page', () => {
    cy.findAllByText('Login').filter(':visible').first().click()
    cy.url().should('include', '/login')
  })

  it('should show appbar if scroll > 480px', () => {
    cy.scrollTo(0, 500)
    cy.get('[data-cy=appbar]').should('be.visible')
  })

  it('should save search keywords', () => {
    cy.scrollTo(0, 500)
    cy.get('input[type=text]')
      .focus()
      .type('some keywords{enter}')
      .focus()
      .should('have.value', 'some keywords')
  })

  it('should show drawer menu icon if width < 600px', () => {
    cy.viewport(599, 500)
      .get('[data-cy=drawer-icon]')
      .filter(':visible')
      .click()
      .get('[data-cy=drawer]')
      .should('be.visible')
      .get('[data-cy=close]')
      .click()
      .get('[data-cy=drawer]')
      .should('not.exist')
  })

  it('should hide banner if width < 960px', () => {
    cy.viewport(800, 500).get('[data-cy=banner-image]').should('not.be.visible')
  })

  it('should search field be focused when click on fab', () => {
    cy.scrollTo(0, 500)
      .get('[data-cy=fab]')
      .should('be.visible')
      .click()
      .get('input[name=keywords]')
      .should('be.focused')
      .type('some key words{enter}')
      .should('not.be.focused')
      .get('input[name=keywords]')
      .focus()
      .get('button[type=submit]')
      .click()
      .get('input[name=keywords]')
      .should('not.be.focused')
  })

  it('should hide search field if width < 450px', () => {
    cy.scrollTo(0, 500)
    cy.viewport('iphone-6')
      .get('input[name=keywords]')
      .should('not.exist')
      .get('button[data-cy=fab]')
      .click()
      .get('input[name=keywords]')
      .should('be.visible')
      .type('something{enter}')
      .should('not.exist')
  })
})
