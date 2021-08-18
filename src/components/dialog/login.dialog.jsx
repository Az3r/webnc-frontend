import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogActions,
  Button,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  DialogContent
} from '@material-ui/core'
import Image from 'next/image'
import { PasswordField } from '../inputs'
import { fetchPOST, resources } from '@/utils/api'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    ['& > div']: {
      margin: theme.spacing(1, 0)
    },
    ['& > input[type=submit]']: {
      visibility: 'hidden'
    }
  }
}))

export default function LoginDialog({ user, onConfirm, onCancel, ...props }) {
  const styles = useStyles()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitEl = useRef(undefined)

  async function onVerify(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (user?.username === username) {
        await fetchPOST(resources.auth.login, {
          username,
          email: username,
          password
        })

        onConfirm?.call(undefined, username, password)
      } else {
        setError('You must verify using your current account')
      }
    } catch (error) {
      setError('Invalid Username or Password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <Typography align="center" component="div">
          <Image
            width={96}
            height={96}
            src="/images/logo_icon.webp"
            alt="App's logo"
          />
        </Typography>
        <Typography align="center" variant="h6">
          Before proceeding, please verify yourself...
        </Typography>
        <form className={styles.form} onSubmit={onVerify}>
          <TextField
            name="username"
            required
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={submitting}
          />
          <PasswordField
            label="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
          />
          <input type="submit" ref={submitEl} />
        </form>
        {error && (
          <Typography color="error" align="center">
            *{error}*
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {submitting && <CircularProgress />}
        <Button onClick={onCancel} autoFocus disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={() => submitEl.current.click()}
          color="primary"
          variant="contained"
          disabled={submitting}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  )
}

LoginDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
}
