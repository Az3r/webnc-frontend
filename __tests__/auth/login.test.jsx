import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/features/auth/login.component'
import AuthContext from '@/features/auth/auth.context'

describe('<Login/>', () => {
  test('should update value', () => {
    const { getByLabelText } = render(<TestComponent />)

    const username = getByLabelText('username').querySelector('input')
    fireEvent.change(username, { target: { value: '123' } })
    expect(username).toHaveValue('123')

    const password = getByLabelText('password').querySelector('input')
    fireEvent.change(password, { target: { value: '123' } })
    expect(password).toHaveValue('123')
  })

  test('should change password visibility', () => {
    const { getByLabelText, getByRole } = render(<TestComponent />)
    const password = getByLabelText('password').querySelector('input')
    expect(password.type).toBe('password')

    const button = getByRole('button', { name: 'show-password-button' })
    userEvent.click(button)
    expect(password.type).toBe('text')
  })

  test('should update ui to form processing state', () => {
    const { getByLabelText, getByRole, queryByRole } = render(<TestComponent />)
    expect(queryByRole('progressbar')).toBeFalsy()
    const username = getByLabelText('username').querySelector('input')
    const password = getByLabelText('password').querySelector('input')
    const submit = getByRole('button', { name: 'submit' })
    userEvent.type(username, 'test username')
    userEvent.type(password, '123')

    userEvent.click(submit)
    expect(submit).toBeDisabled()
    expect(getByRole('progressbar')).toBeVisible()
  })

  test('should change focus when press Tab', () => {
    const { getByLabelText, getByRole } = render(<TestComponent />)
    const username = getByLabelText('username').querySelector('input')
    const password = getByLabelText('password').querySelector('input')
    const submit = getByRole('button', { name: 'submit' })
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
})

function TestComponent() {
  const [form, update] = React.useState({
    username: '',
    password: '',
    email: ''
  })
  return (
    <AuthContext.Provider
      value={{
        form,
        update
      }}
    >
      <Login />
    </AuthContext.Provider>
  )
}
