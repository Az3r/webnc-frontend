import React, { useContext, useState } from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import AuthContext from './auth.context'
import useStyles from './auth.style'
import { EmailField, PasswordField, UserField } from '@/components/inputs'
import { useSnackBar } from '@/components/snackbar'
import { parse } from '@/utils/errors'

export default function Register() {
  const styles = useStyles()
  const { show } = useSnackBar()
  const { form, update, next } = useContext(AuthContext)
  const [processing, process] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    process(true)
    try {
      const api = await import('./auth.api')
      await api.regsiter(form)
      next()

      show({
        open: true,
        severity: 'success',
        message: 'Register successfully'
      })
    } catch (e) {
      const error = parse(e)
      show({
        open: true,
        severity: 'error',
        message: error.code
      })
    } finally {
      process(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} aria-busy={processing}>
      <Typography align="center" variant="h4">
        Register
      </Typography>
      <UserField
        className={styles.field}
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <EmailField
        className={styles.field}
        onChange={(e) => update((prev) => ({ ...prev, email: e.target.value }))}
        value={form.email}
      />
      <PasswordField
        className={styles.field}
        value={form.password}
        onChange={(e) =>
          update((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        aria-label="register"
        disabled={processing}
        className={styles.submit}
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
