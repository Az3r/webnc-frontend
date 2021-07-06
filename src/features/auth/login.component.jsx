import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core'
import AuthContext from './auth.context'
import { PasswordField } from '@/components/inputs'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/hooks/auth.provider'
import { useSnackbar } from 'notistack'

export default function Login({ classes }) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { revalidate } = useAuth()
  const { form, update, next } = useContext(AuthContext)
  const [processing, process] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    process(true)
    const api = await import('./auth.api')
    try {
      await api.login(form)
      enqueueSnackbar('Login successfully', { variant: 'success' })

      revalidate()

      router.push('/')
    } catch (error) {
      if (error.code === 'AuthError/account-not-verified') {
        api.resend(form.email)
        update((prev) => ({ ...prev, email: error.value }))
        next(2)
      }
      enqueueSnackbar(error.code, { variant: 'error' })
    } finally {
      process(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={classes.form}
      aria-busy={processing}
      method="POST"
    >
      <Typography align="center" variant="h4">
        Sign in
      </Typography>
      <TextField
        name="login-username"
        label="Username/Email"
        required
        className={classes.field}
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <PasswordField
        label="Password"
        name="login-password"
        className={classes.field}
        value={form.password}
        onChange={(e) =>
          update((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        disabled={processing}
        fullWidth
        className={classes.submit}
        aria-label="login"
        type="submit"
        variant="contained"
        color="primary"
      >
        {processing ? (
          <CircularProgress role="progress" style={{ width: 30, height: 30 }} />
        ) : (
          'Sign in'
        )}
      </Button>
      <Typography align="center">Does not have an account?</Typography>
      <Box margin="auto" marginTop={1}>
        <Button
          aria-label="register"
          variant="outlined"
          color="secondary"
          style={{ width: 120 }}
          onClick={() => next()}
        >
          Register
        </Button>
      </Box>
    </form>
  )
}

Login.propTypes = {
  classes: PropTypes.object
}

Login.defaultProps = {
  classes: {}
}
