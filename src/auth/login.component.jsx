import React, { useContext } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import AuthContext from './auth.context'
import useStyles from './auth.style'
import { PasswordField, UserField } from '@/components/inputs'

export default function Login() {
  const styles = useStyles()
  const { form, update, next } = useContext(AuthContext)

  return (
    <form onSubmit={(e) => login(e, form)} className={styles.form}>
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
        fullWidth
        className={styles.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Sign in
      </Button>
      <Typography align="center">Does not have an account?</Typography>
      <Box margin="auto">
        <Button
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

async function login(e, form) {
  e.preventDefault()
  console.log(form)
}
