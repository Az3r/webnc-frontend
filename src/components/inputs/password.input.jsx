import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

export default function PasswordField({ className, onChange, value }) {
  const [visible, toggle] = React.useState(false)
  return (
    <TextField
      className={className}
      required
      label="Password"
      aria-label="password"
      name="password"
      type={visible ? 'text' : 'password'}
      onChange={onChange}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="show-password-button"
              edge="end"
              onClick={() => toggle((prev) => !prev)}
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

PasswordField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  show: PropTypes.bool,
  className: PropTypes.string
}

PasswordField.defaultProps = {
  onChange: undefined,
  value: undefined,
  show: false,
  className: undefined
}
