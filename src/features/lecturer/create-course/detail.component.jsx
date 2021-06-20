import { Editor, Presenter } from '@/components/markdown'
import { Box, Button, Dialog, IconButton, Typography } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import React, { useState } from 'react'
import useStyles from './detail.style'
import DetailDialog from './edit-detail.dialog'

export default function UpdateDetail(_, ref) {
  const styles = useStyles()
  const [text, setText] = useState('')
  const [editText, setEditText] = useState(false)
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Typography className={styles.header}>What you will learn</Typography>
        <Box color="info.main">
          <IconButton color="inherit" onClick={() => setEditText(true)}>
            <Create />
          </IconButton>
        </Box>
      </Box>
      {!text && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="50vh"
        >
          <Typography color="textSecondary" variant="h5" align="center">
            <em>
              Give a detail explaination, what student will learn, what they
              will get after completing this course
            </em>
          </Typography>
          <Box padding={1} />
          <Button
            color="primary"
            variant="contained"
            onClick={() => setEditText(true)}
          >
            Edit
          </Button>
        </Box>
      )}
      {text && <Presenter>{text}</Presenter>}
      <Dialog open={editText} onClose={() => setEditText(false)}>
        <DetailDialog
          text={text}
          onDone={(text) => {
            setText(text)
            setEditText(false)
          }}
          onCancel={() => {
            setEditText(false)
          }}
        />
      </Dialog>
    </div>
  )
}
