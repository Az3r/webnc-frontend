import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

export default function EmailField({ className, onChange, value }) {
  return (
    <TextField
      className={className}
      required
      label="Email"
      id="email"
      aria-label="email"
      name="email"
      type="email"
      onChange={onChange}
      value={value}
    />
  )
}

EmailField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string
}

EmailField.defaultProps = {
  onChange: undefined,
  value: undefined,
  className: undefined
}
