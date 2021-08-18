import React from 'react'
import { render } from '@testing-library/react'
import event from '@testing-library/user-event'
import VerifyEmail from '@/features/auth/verify.component'
import AuthContext from '@/features/auth/auth.context'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, Slide } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

test('should input field be not modifiable', () => {
  const { getByLabelText } = render(<TestComponent />)
  const email = getByLabelText('email').querySelector('input')
  expect(email).toHaveValue('test-email')
  event.type(email, 'lkgjdklgjkdlgjdlrkgj')
  expect(email).toHaveValue('test-email')
})

function TestComponent() {
  const [form] = React.useState({
    email: 'test-email'
  })
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <AuthContext.Provider
        value={{
          form
        }}
      >
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          TransitionComponent={Slide}
        >
          <VerifyEmail />
        </SnackbarProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}
