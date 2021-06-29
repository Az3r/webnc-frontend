import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/features/auth/login.component'
import AuthContext from '@/features/auth/auth.context'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, Slide } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

test('should update value', () => {
  const { getByLabelText } = render(<TestComponent />)

  const username = getByLabelText('username').querySelector('input')
  fireEvent.change(username, { target: { value: '123' } })
  expect(username).toHaveValue('123')

  const password = getByLabelText('password').querySelector('input')
  fireEvent.change(password, { target: { value: '123' } })
  expect(password).toHaveValue('123')
})

test('should update ui to form processing state', async () => {
  const { getByLabelText, getByRole, queryByRole } = render(<TestComponent />)
  expect(queryByRole('progress')).toBeFalsy()
  const username = getByLabelText('username').querySelector('input')
  const password = getByLabelText('password').querySelector('input')
  const submit = getByRole('button', { name: 'login' })
  userEvent.type(username, 'test username')
  userEvent.type(password, '123')

  act(() => {
    userEvent.click(submit)
  })
  // submit should be disable and has a progress element inside
  expect(submit).toBeDisabled()
  expect(getByRole('progress')).toBeVisible()

  // after an amount of time, progress element should disappear
  await waitFor(() => expect(queryByRole('progress')).toBeFalsy())
})

test('should change focus when press Tab', () => {
  const { getByLabelText, getByRole } = render(<TestComponent />)
  const username = getByLabelText('username').querySelector('input')
  const password = getByLabelText('password').querySelector('input')
  const submit = getByRole('button', { name: 'login' })
  const register = getByRole('button', { name: 'register' })

  // test initial states
  expect(username).not.toHaveFocus()
  expect(password).not.toHaveFocus()
  expect(submit).not.toHaveFocus()
  expect(register).not.toHaveFocus()

  userEvent.tab()
  expect(username).toHaveFocus()
  userEvent.tab()
  expect(password).toHaveFocus()
  userEvent.tab()
  expect(submit).toHaveFocus()
  userEvent.tab()
  expect(register).toHaveFocus()
})

function TestComponent() {
  const [form, update] = React.useState({
    username: '',
    password: '',
    email: ''
  })
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <AuthContext.Provider
        value={{
          form,
          update
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
          <Login classes={{}} />
        </SnackbarProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}
