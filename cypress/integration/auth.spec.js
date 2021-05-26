const username = 'input[name=username]:visible'
const email = 'input[name=email]:visible'
const password = 'input[name=password]:visible'
const submit = 'button[type=submit]:visible'

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

  it('should unverified account be required to verified', () => {
    cy.visit('/login')
      .intercept(/login/i, (req) => {
        req.reply({
          statusCode: 400,
          body: { error: 'auth/account-not-verified' }
        })
      })
      .get(username)
      .type('something{enter}')
      .focused()
      .type('something{enter}')
      .get('[role=alert')
      .should('be.visible')
      .should('have.class', 'MuiAlert-filledError')
      .should('have.text', 'auth/account-not-verified')
      .get('button')
      .contains('Verify')
      .should('be.visible')
  })
})

describe('<Register/>', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should be able to go back to login', () => {
    cy.get('button[data-cy=back]')
      .should('be.visible')
      .click()
      .get('button[data-cy=back]')
      .should('not.be.visible')
      .get('h4')
      .contains('Sign in')
      .should('be.visible')
  })

  it('should go to verify after filling in form', () => {
    cy.intercept(/register/i, (req) => {
      req.reply({
        statusCode: 200,
        body: {}
      })
    })
      .get('input[name=username]:visible')
      .type('test-username')
      .get('input[name=email]:visible')
      .type('test-email@gmail.com')
      .get('input[name=password]:visible')
      .type('ManhTuan@1999{enter}')
      .get('div[role=alert]')
      .should('be.visible')
      .should('have.text', 'Register successfully')
      .should('have.class', 'MuiAlert-filledSuccess')
      .get('button')
      .contains('Verify')
  })

  it('should display error if form is invalid', () => {
    cy.intercept(/register/i, (req) => {
      req.reply({
        statusCode: 400,
        body: { error: 'auth/username-existed' }
      })
    })
      .get(username)
      .type('test-username')
      .get(email)
      .type('test-email@gmail.com')
      .get(password)
      .type('ManhTuan@1999{enter}')
      .get('div[role=alert]')
      .should('be.visible')
      .should('have.text', 'auth/username-existed')
      .should('have.class', 'MuiAlert-filledError')
      .intercept(/register/i, (req) => {
        req.reply({
          statusCode: 400,
          body: { error: 'auth/email-existed' }
        })
      })
      .get(submit)
      .click()
      .get('button')
      .contains('Verify')
      .should('not.be.visible')
  })

  it('should browser focus all required fields', () => {
    cy.intercept(/auth/i, (req) => {
      req.reply({
        delay: 100
      })
    })
      .get(submit)
      .click()
      .get(username)
      .should('be.focused')
      .type('text{enter}')
      .get(email)
      .should('be.focused')
      .type('text@gmail.com{enter}')
      .get(password)
      .should('be.focused')
      .type('text{enter}')
      .get('[role=progress]')
      .should('be.visible')
  })
})

describe('<VerifyEmail/>', () => {
  beforeEach(() => {
    cy.visit('/login')
      .intercept(/login/i, (req) => {
        req.reply({
          statusCode: 400,
          body: { error: 'auth/account-not-verified:something' }
        })
      })
      .get(username)
      .type('something{enter}')
      .focused()
      .type('something{enter}')
  })

  /* WARNING: THIS TEST WILL FAIL BECAUSE FUCK CYPRESS
  it('should email field be not editable', () => {
    cy.get(email).type('dgjldgjdlgjdljg').should('have.text', 'something')
  })
  */

  it('should order be otp 1 -> 6 -> verify button', () => {
    cy.intercept(/verify/i, (req) => {
      req.reply({
        statusCode: 200,
        body: { success: false }
      })
    })
      .get(email)
      .should('have.value', 'something')
      .get('input[name=otp-0]')
      .should('have.attr', 'type', 'number')
      .type('1')
      .focused()
      .type('2')
      .focused()
      .type('3')
      .focused()
      .type('4')
      .focused()
      .type('5')
      .focused()
      .type('6')
      .focused()
      .click()
      .intercept(/verify/i, (req) =>
        req.reply({ statusCode: 200, body: { success: true } })
      )
      .get('button[name=verify]')
      .click()
      .url()
      .should('include', 'dashboard')
  })
})
