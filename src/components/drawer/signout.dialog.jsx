import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from '@material-ui/core'

export default function SignoutDialog({ onConfirm, onCancel, ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to sign out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="text">
          Confirm
        </Button>
        <Button
          variant="contained"
          onClick={onCancel}
          color="primary"
          autoFocus
        >
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SignoutDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}
