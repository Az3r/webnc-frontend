import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Send } from '@material-ui/icons'

export default function ProfileDialog({
  student,
  onConfirm,
  onCancel,
  ...props
}) {
  const [email, setEmail] = useState(student.email)
  const [username, setUsername] = useState(student.username)
  const [verified, setVerified] = useState(false)

  return (
    <Dialog {...props}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          fullWidth
        />
        <Box display="flex" marginTop={4}>
          <TextField
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
          />
          <Tooltip title="Send email verification" placement="top">
            <IconButton color="secondary">
              <Send />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" disabled={!verified}>
          Update
        </Button>
        <Button
          variant="contained"
          onClick={onCancel}
          color="primary"
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ProfileDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  student: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
}
