import React, { useContext } from 'react'
import { Button, Typography } from '@material-ui/core'
import clsx from 'clsx'
import AuthContext from './auth.context'
import useStyles from './auth.style'
import { EmailField, PasswordField, UserField } from '@/components/inputs'

export default function Register() {
  const styles = useStyles()
  const { form, update } = useContext(AuthContext)

  return (
    <form onSubmit={(e) => register(e, form)} className={styles.form}>
      <Typography align="center" variant="h4">
        Register
      </Typography>
      <UserField
        className={styles.input}
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <EmailField
        className={styles.input}
        onChange={(e) => update((prev) => ({ ...prev, email: e.target.value }))}
        value={form.email}
      />
      <PasswordField
        className={styles.input}
        value={form.password}
        onChange={(e) =>
          update((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        className={clsx(styles.input, styles.button)}
        type="submit"
        variant="contained"
        color="primary"
      >
        Register
      </Button>
    </form>
  )
}

async function register(e, form) {
  e.preventDefault()
  console.log(form)
}
