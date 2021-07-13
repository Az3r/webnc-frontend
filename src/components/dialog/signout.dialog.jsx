import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

export default function SignoutDialog({ onConfirm, onCancel, ...props }) {
  return (
    <Dialog {...props}>
      <DialogTitle>Signing out</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to sign out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel} autoFocus>
          Dismiss
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SignoutDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}
