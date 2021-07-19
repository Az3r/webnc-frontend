import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  TextField,
  makeStyles,
  Typography,
  CircularProgress
} from '@material-ui/core'
import dynamic from 'next/dynamic'
import { fetchPUT, resources } from '@/utils/api'

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

const LoginDialog = dynamic(() => import('./login.dialog'))

export default function ProfileDialog({ user, onConfirm, onClose, ...props }) {
  const styles = useStyles()

  const [email, setEmail] = useState(user.email)
  const [username, setUsername] = useState(user.username)
  const [verifyDialog, setVerifyDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const submitEl = useRef(undefined)

  async function onUpdate() {
    setVerifyDialog(false)
    setSubmitting(true)

    try {
      await fetchPUT(resources.user.put, {
        userId: user.id,
        newUserName: username,
        newEmail: email,
        newAvatarUrl: user.avatar,
        description: 'LÀM ƠN FIX DÙM CON ĐI BỐ, CON LẠY BỐ'
      })
      onConfirm?.()
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    setVerifyDialog(true)
  }

  return (
    <>
      <Dialog {...props}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <form className={styles.form} onSubmit={onSubmit}>
            <TextField
              required
              autoFocus
              onFocus={(e) => e.target.select()}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              fullWidth
              disabled={submitting}
            />
            <TextField
              required
              onFocus={(e) => e.target.select()}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              type="email"
              fullWidth
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
          <Button onClick={onClose} autoFocus disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={() => submitEl.current.click()}
            color="primary"
            variant="contained"
            disabled={submitting}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <LoginDialog
        user={user}
        open={verifyDialog}
        maxWidth="xs"
        fullWidth
        onConfirm={onUpdate}
        onCancel={() => setVerifyDialog(false)}
      />
    </>
  )
}

ProfileDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  })
}
