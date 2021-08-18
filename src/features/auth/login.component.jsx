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
import qs from 'qs'

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
      await api.login({
        username: form.username.trim(),
        password: form.password
      })
      enqueueSnackbar('Login successfully', { variant: 'success' })

      revalidate()

      const { redirect } = router.query
      router.push(redirect ?? '/')
    } catch (error) {
      // account must be verified before using services
      if (error.code === 'AuthError/account-not-verified') {
        update((prev) => ({ ...prev, email: error.value }))
        api.resend(error.value)
        next(2)
        return enqueueSnackbar('Please verify your Account', {
          variant: 'info'
        })
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
        name="login-username"
        label="Username"
        type="text"
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
