import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Typography,
  CircularProgress
} from '@material-ui/core'
import dynamic from 'next/dynamic'
import { fetchPOST, resources } from '@/utils/api'
import { PasswordField } from '../inputs'

const LoginDialog = dynamic(() => import('./login.dialog'))

export default function PasswordDialog({
  user,
  onConfirm,
  onCancel,
  ...props
}) {
  const [password, setPassword] = useState('')
  const [verifyDialog, setVerifyDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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
    if (password) setVerifyDialog(true)
    else setError('Password must not be empty')
  }

  return (
    <>
      <Dialog {...props}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <PasswordField
            autoFocus
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Your new Password"
            fullWidth
            disabled={submitting}
          />
          {error && (
            <Typography color="error" align="center">
              *{error}*
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {submitting && <CircularProgress />}
          <Button onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
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
