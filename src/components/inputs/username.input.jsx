import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

export default function UserField({ className, onChange, value }) {
  return (
    <TextField
      className={className}
      required
      label="Username"
      aria-label="username"
      name="username"
      type="text"
      onChange={onChange}
      value={value}
    />
  )
}

UserField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string
}

UserField.defaultProps = {
  onChange: undefined,
  value: undefined,
  className: undefined
}
