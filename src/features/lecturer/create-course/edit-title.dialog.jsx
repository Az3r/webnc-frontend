import React from 'react'
import PropTypes from 'prop-types'
import {
  DialogContent,
  DialogActions,
  TextField,
  Button,
  DialogTitle,
  DialogContentText
} from '@material-ui/core'

export default function TitleDialog({ title, onDone, onCancel }) {
  const [text, update] = React.useState(title)
  function submit(e) {
    e.preventDefault()
    if (onDone) onDone(text)
  }
  return (
    <form onSubmit={submit}>
      <DialogTitle>Edit Title</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Title should be short and expressive
        </DialogContentText>
        <TextField
          autoFocus
          required
          style={{ width: 450 }}
          onFocus={(e) => e.target.select()}
          fullWidth
          value={text}
          onChange={(e) => update(e.target.value)}
          onKeyPress={(e) => {
            if (e.code === 'Enter') e.target.blur()
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </form>
  )
}

TitleDialog.propTypes = {
  title: PropTypes.string,
  onDone: PropTypes.func,
  onCancel: PropTypes.func
}
