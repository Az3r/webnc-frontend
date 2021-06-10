import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import AuthContext from './auth.context'
import { PasswordField, UserField } from '@/components/inputs'
import { useSnackBar } from '@/components/snackbar'
import { useRouter } from 'next/router'
import { routes } from '@/utils/app'
import { parse } from '@/utils/errors'

export default function Login({ classes }) {
  const router = useRouter()
  const { show } = useSnackBar()
  const { form, update, next } = useContext(AuthContext)
  const [processing, process] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    process(true)
    const api = await import('./auth.api')
    try {
      const user = await api.login(form)
      show({ open: true, severity: 'success', message: 'Login successfully' })
      router.push(
        {
          pathname: routes.dashboard,
          query: user
        },
        routes.dashboard
      )
    } catch (e) {
      const error = parse(e)
      if (error.code === 'auth/account-not-verified') {
        api.resend(form.email)
        update((prev) => ({ ...prev, email: error.value }))
        next(2)
      }
      show({ open: true, severity: 'error', message: error.code })
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
      <UserField
        className={classes.field}
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <PasswordField
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
