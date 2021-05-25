import React, { useContext, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import AuthContext from './auth.context'
import useStyles from './auth.style'
import { PasswordField, UserField } from '@/components/inputs'
import { useSnackBar } from '@/components/snackbar'
import { useRouter } from 'next/router'
import { routes } from '@/utils/app'
import { parse } from '@/utils/errors'

export default function Login() {
  const styles = useStyles()
  const router = useRouter()
  const { show } = useSnackBar()
  const { form, update, next } = useContext(AuthContext)
  const [processing, process] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    process(true)
    return login(form)
      .then((user) => {
        show({ open: true, severity: 'success', message: 'Login successfully' })
        router.push(
          {
            pathname: routes.dashboard,
            query: user
          },
          routes.dashboard
        )
      })
      .catch((e) => {
        const error = parse(e)
        show({ open: true, severity: 'error', message: error.code })
      })
      .finally(() => {
        process(false)
      })
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} aria-busy={processing}>
      <Typography align="center" variant="h4">
        Sign in
      </Typography>
      <UserField
        className={styles.input}
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <PasswordField
        className={styles.input}
        value={form.password}
        onChange={(e) =>
          update((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        disabled={processing}
        fullWidth
        className={styles.button}
        aria-label="submit"
        type="submit"
        variant="contained"
        color="primary"
      >
        {processing ? (
          <CircularProgress style={{ width: 30, height: 30 }} />
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
          onClick={next}
        >
          Register
        </Button>
      </Box>
    </form>
  )
}

async function login(form) {
  console.log(form)
  const api = await import('./auth.api')
  return api.login(form)
  // await new Promise((resolve) => setTimeout(resolve, 1000))
}
