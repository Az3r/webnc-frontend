import React from 'react'
import { render } from '@testing-library/react'
import event from '@testing-library/user-event'
import PasswordField from '@/components/inputs/password.input'
import { testids } from '@/utils/testing'

test('should toggle visibility', () => {
  const { getByRole, getByLabelText } = render(<PasswordField />)
  const input = getByLabelText('password').querySelector('input')
  const toggle = getByRole('button', { name: testids.toggle_password })
  expect(input).toHaveAttribute('type', 'password')
  event.click(toggle)
  expect(input).toHaveAttribute('type', 'text')
  event.click(toggle)
  expect(input).toHaveAttribute('type', 'password')
})
