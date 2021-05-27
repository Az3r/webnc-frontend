import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { testids } from '@/utils/testing'

export default function PasswordField({ className, onChange, value }) {
  const [visible, toggle] = React.useState(false)
  return (
    <TextField
      className={className}
      required
      label="Password"
      id="password"
      aria-label="password"
      name="password"
      type={visible ? 'text' : 'password'}
      onChange={onChange}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              tabIndex="-1"
              data-cy={testids.toggle_password}
              aria-label={testids.toggle_password}
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
