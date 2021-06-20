import React from 'react'
import PropTypes from 'prop-types'
import {
  DialogContent,
  DialogTitle,
  Button,
  Box,
  DialogActions
} from '@material-ui/core'
import { Editor } from '@/components/markdown'

export default function DetailDialog({ text, onDone, onCancel }) {
  const [markdown, update] = React.useState(text)
  function submit(e) {
    e.preventDefault()
    onDone?.call(undefined, markdown)
  }
  return (
    <form onSubmit={submit}>
      <DialogTitle>Edit Detail</DialogTitle>
      <DialogContent>
        <Box height="50vh">
          <Editor
            required
            value={markdown}
            onChange={(s) => update(s.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Done
        </Button>
      </DialogActions>
    </form>
  )
}

DetailDialog.propTypes = {
  text: PropTypes.string,
  onDone: PropTypes.func,
  onCancel: PropTypes.func
}
