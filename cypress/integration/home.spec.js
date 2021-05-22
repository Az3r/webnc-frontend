describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
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
  it('should show drawer menu icon if width < 600px', () => {
    cy.viewport(599, 500).get('[data-cy=drawer-icon]').should('be.visible')
  })

  it('should hide banner if width < 960px', () => {
    cy.viewport(800, 500).get('[data-cy=banner-image]').should('not.exist')
  })
})
