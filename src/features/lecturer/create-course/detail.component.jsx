import { Editor, Presenter } from '@/components/markdown'
import { Box, Button, IconButton, Typography } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import React, { useState } from 'react'
import useStyles from './detail.style'

export default function UpdateDetail(_, ref) {
  const styles = useStyles()
  const [text, setText] = useState('')
  const [editText, setEditText] = useState(false)
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Typography className={styles.header}>What you will learn</Typography>
        <IconButton onClick={() => setEditText(true)}>
          <Create />
        </IconButton>
      </Box>
      {editText ? (
        <Box height={320}>
          <Editor value={text} onChange={(s) => setText(s)} />
          <Box display="flex" paddingTop={1}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 120 }}
              onClick={() => setEditText(false)}
            >
              Done
            </Button>
            <Button color="primary" style={{ width: 120 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Presenter>{text}</Presenter>
      )}
    </div>
  )
}
