import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Login from '@/auth/login.component'
import AuthContext from '@/auth/auth.context'

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
