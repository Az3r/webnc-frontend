import React, { useState, useContext } from 'react'
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx'
import AuthContext from './auth.context'
import useStyles from './auth.style'

export default function Register() {
  const styles = useStyles()
  const [password, toggle] = useState(true)
  const { form, update } = useContext(AuthContext)

  return (
    <form onSubmit={(e) => register(e, form)} className={styles.form}>
      <Typography align="center" variant="h4">
        Register
      </Typography>
      <TextField
        className={styles.input}
        required
        label="Username"
        name="username"
        type="text"
        onChange={(e) =>
          update((prev) => ({ ...prev, username: e.target.value }))
        }
        value={form.username}
      />
      <TextField
        className={styles.input}
        required
        label="Email"
        name="email"
        type="email"
        onChange={(e) => update((prev) => ({ ...prev, email: e.target.value }))}
        value={form.email}
      />
      <TextField
        className={styles.input}
        required
        label="Password"
        name="password"
        type={password ? 'password' : 'text'}
        value={form.password}
        onChange={(e) =>
          update((prev) => ({ ...prev, password: e.target.value }))
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => toggle((prev) => !prev)}>
                {password ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
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
