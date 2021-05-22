import React from 'react'
import { render } from '@testing-library/react'
import { Typography } from '@material-ui/core'
import '@testing-library/jest-dom/extend-expect'

test('<Typography/>', () => {
  const { getByRole } = render(<Typography variant="h1">Hello</Typography>)
  expect(getByRole('heading')).toHaveTextContent('Hello')
})
