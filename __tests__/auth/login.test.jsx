import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from '@/auth/login.component'
import AuthContext from '@/auth/auth.context'

test('<Login/>', () => {
  const TestComponent = () => (
    <AuthContext.Provider
      value={{
        next: () => {},
        previous: () => {},
        form: { username: '', password: '', email: '' },
        update: () => {}
      }}
    >
      <Login />
    </AuthContext.Provider>
  )
  const { getByLabelText, getByRole } = render(<TestComponent />)

  const username = getByRole('textbox', { name: 'username' })
  fireEvent.change(username, { target: { value: '123' } })
  expect(username).toHaveValue('123')

  const password = getByLabelText('password')
})
