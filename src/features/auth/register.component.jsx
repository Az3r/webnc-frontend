import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core'
import AuthContext from './auth.context'
import { PasswordField } from '@/components/inputs'
import { useSnackbar } from 'notistack'

export default function Register({ classes }) {
  const { enqueueSnackbar } = useSnackbar()
  const { form, update, next } = useContext(AuthContext)
  const [processing, process] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    process(true)
    try {
      const api = await import('./auth.api')
      await api.register(form)
      next()

      enqueueSnackbar('Register successfully', { variant: 'success' })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      process(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={classes.form} aria-busy={processing}>
      <Typography align="center" variant="h4">
        Register
      </Typography>
      <TextField
        name="register-username"
        label="Username"
        required
        className={classes.field}
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <TextField
        name="register-email"
        label="Email"
        type="email"
        required
        className={classes.field}
        onChange={(e) => update((prev) => ({ ...prev, email: e.target.value }))}
        value={form.email}
      />
      <PasswordField
        label="Password"
        name="register-password"
        className={classes.field}
        value={form.password}
        onChange={(e) =>
          update((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        aria-label="register"
        disabled={processing}
        className={classes.submit}
        type="submit"
        variant="contained"
        color="secondary"
      >
        {processing ? (
          <CircularProgress role="progress" style={{ width: 30, height: 30 }} />
        ) : (
          'Register'
        )}
      </Button>
    </form>
  )
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
}

Register.defaultProps = {
  classes: {}
}
