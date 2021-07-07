import React, { useContext, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import AuthContext from './auth.context'
import { PasswordField } from '@/components/inputs'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/hooks/auth.provider'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    margin: theme.spacing(2, 0)
  },
  submit: {
    margin: theme.spacing(4, 0),
    height: 40
  }
}))

export default function Login() {
  const router = useRouter()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { revalidate } = useAuth()
  const { form, update, next } = useContext(AuthContext)
  const [processing, process] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    process(true)
    const api = await import('./auth.api')
    try {
      await api.login({ username: form.email.trim(), password: form.password })
      enqueueSnackbar('Login successfully', { variant: 'success' })

      revalidate()

      router.push('/')
    } catch (error) {
      if (error.code === 'AuthError/account-not-verified') {
        // TODO wait for backend to add email into error response
        // api.resend(error.email)
        // update((prev) => ({ ...prev, email: error.email }))
        api.resend(form.email)
        next(2)
      }
      enqueueSnackbar(error.message, { variant: 'error' })
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
        name="login-email"
        label="Email"
        type="email"
        required
        className={classes.field}
        onChange={(e) => update((prev) => ({ ...prev, email: e.target.value }))}
        value={form.email}
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
