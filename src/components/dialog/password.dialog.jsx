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
import { fetchPOST, fetchPUT, resources } from '@/utils/api'
import { PasswordField } from '../inputs'

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

export default function PasswordDialog({
  user,
  onConfirm,
  onCancel,
  ...props
}) {
  const styles = useStyles()

  const [password, setPassword] = useState('')
  const [verifyDialog, setVerifyDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const submitEl = useRef(undefined)

  async function onUpdate(_, oldPassword) {
    setVerifyDialog(false)
    setSubmitting(true)

    try {
      await fetchPOST(resources.auth.changePassword, {
        userId: user.id,
        oldPassword,
        newPassword: password,
        confirmPassword: password
      })
      onConfirm?.call(undefined)
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
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <form className={styles.form} onSubmit={onSubmit}>
            <PasswordField
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Your new Password"
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
          <Button onClick={onCancel} autoFocus disabled={submitting}>
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

PasswordDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  })
}
