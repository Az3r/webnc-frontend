import { Presenter } from '@/components/markdown'
import { Box, Button, Dialog, IconButton, Typography } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import React, { useState } from 'react'
import { useCreateCourse } from './create-course.context'
import useStyles from './detail.style'
import DetailDialog from './edit-detail.dialog'

export default function UpdateDetail() {
  const styles = useStyles()
  const { course, update } = useCreateCourse()
  const { detail } = course

  const [dialog, show] = useState(false)
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Typography className={styles.header}>What you will learn</Typography>
        <Box color="info.main">
          <IconButton color="inherit" onClick={() => show(true)}>
            <Create />
          </IconButton>
        </Box>
      </Box>
      {!detail && (
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
            onClick={() => show(true)}
          >
            Edit
          </Button>
        </Box>
      )}
      {detail && <Presenter>{detail}</Presenter>}
      <Dialog open={dialog} onClose={() => show(false)} fullWidth maxWidth="lg">
        <DetailDialog
          text={detail}
          onDone={(text) => {
            update({ detail: text })
            show(false)
          }}
          onCancel={() => {
            show(false)
          }}
        />
      </Dialog>
    </div>
  )
}
