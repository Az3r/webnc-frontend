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

export default function ConfirmDialog({
  onConfirm,
  onClose,
  title = 'Signing out',
  message = 'Are you sure you want to sign out?',
  ...props
}) {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} autoFocus>
          Dismiss
        </Button>
        <Button
          onClick={() => {
            onConfirm?.()
            onClose?.()
          }}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
}

ConfirmDialog.defaultProps = {
  title: 'Signing out',
  message: 'Are you sure you want to sign out?'
}
