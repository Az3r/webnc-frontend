import React from 'react'
import PropTypes from 'prop-types'
import { Container, Typography } from '@material-ui/core'
import { Warning } from '@material-ui/icons'

export default function MainError({ error }) {
  const { code, value } = error
  return (
    <Container maxWidth="xs">
      <Warning color="error" fontSize="large" />
      <Typography color="error" variant="h5">
        {code}
      </Typography>
      <Typography>{value}</Typography>
    </Container>
  )
}

MainError.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired
}
