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
    onDone?.call(undefined, text)
  }
  return (
    <form onSubmit={submit}>
      <DialogTitle>Edit Detail</DialogTitle>
      <DialogContent>
        <Box height={320}>
          <Editor value={markdown} onChange={(s) => update(s)} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 120 }}
        >
          Done
        </Button>
        <Button color="primary" style={{ width: 120 }} onClick={onCancel}>
          Cancel
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
