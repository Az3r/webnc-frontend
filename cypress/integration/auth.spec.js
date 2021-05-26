describe('<Login/>', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it('should all required fields must be filled', () => {
    cy.intercept('POST', /auth/i, (req) => {
      req.reply({
        delay: 100
      })
    })
      .get('button[type=submit]:visible')
      .click()
      .get('input[name=username]:visible')
      .should('be.focused')
      .type('some name{enter}')
      .get('input[name=password]:visible')
      .should('be.focused')
      .type('some password{enter}')
      .get('button[type=submit]:visible')
      .should('be.disabled')
      .get('[role=progress]:visible')
      .should('be.visible')
  })

  it('should display error snackbar if login failed', () => {
    cy.intercept('POST', /auth/i, (req) => {
      req.reply({
        statusCode: 400,
        delay: 100,
        body: { error: 'auth/username-not-found' }
      })
    })
      .get('input[name=username]:visible')
      .type('some name{enter}')
      .get('input[name=password]:visible')
      .type('some password{enter}')
      .get('div[role=alert]')
      .should('be.visible')
      .should('have.text', 'auth/username-not-found')
      .should('have.class', 'MuiAlert-filledError')
      .intercept('POST', /auth/i, (req) => {
        req.reply({
          statusCode: 400,
          delay: 100,
          body: { error: 'auth/password-not-match' }
        })
      })
      .get('[type=submit]:visible')
      .click()
      .get('div[role=alert]')
      .should('be.visible')
      .should('have.text', 'auth/password-not-match')
      .should('have.class', 'MuiAlert-filledError')
  })

  it('should navigate to dashboard if login success', () => {
    cy.intercept('POST', /auth/i, (req) => {
      req.reply({
        statusCode: 200,
        delay: 100,
        body: {}
      })
    })
      .get('input[name=username]:visible')
      .type('some name{enter}')
      .get('input[name=password]:visible')
      .type('some password{enter}')
      .get('div[role=alert]')
      .should('be.visible')
      .should('have.text', 'Login successfully')
      .should('have.class', 'MuiAlert-filledSuccess')
      .url()
      .should('include', '/dashboard')
  })

  it('should toggle password visibility', () => {
    cy.get('input[name=password]:visible')
      .should('have.attr', 'type', 'password')
      .type('123')
      .get('button[data-cy=toggle-password]:visible')
      .click()
      .get('input[name=password]:visible')
      .should('have.attr', 'type', 'text')
      .get('button[data-cy=toggle-password]:visible')
      .click()
      .get('input[name=password]:visible')
      .should('have.attr', 'type', 'password')
  })

  it('should transition into register', () => {
    cy.get('button')
      .contains('Register')
      .click()
      .get('h4')
      .contains('Register')
      .should('be.visible')
  })
})

describe('<Register/>', () => {
  beforeEach(() => {
    cy.visit('/register')
  })
})
