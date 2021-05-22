import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core'
import AuthContext from './auth.context'
import useStyles from './auth.style'
import { Visibility, VisibilityOff } from '@material-ui/icons'

export default function Login() {
  const styles = useStyles()
  const { form, update, next } = useContext(AuthContext)
  const [password, toggle] = useState(true)

  return (
    <form onSubmit={(e) => login(e, form)} className={styles.form}>
      <Typography align="center" variant="h4">
        Sign in
      </Typography>
      <TextField
        className={styles.input}
        required
        label="Username"
        aria-label="username"
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
        label="Password"
        aria-label="password"
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
