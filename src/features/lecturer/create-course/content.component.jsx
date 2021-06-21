import React, { useState, useRef } from 'react'
import {
  Box,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  Dialog,
  Button
} from '@material-ui/core'
import {
  AddCircle,
  Create,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@material-ui/icons'
import useStyles from './content.style'
import LectureItem from './lecture.component'
import LectureDialog from './edit-lecture.dialog'
import { useCreateCourse } from '.'
import clsx from 'clsx'

export default function CourseContent() {
  const styles = useStyles()
  const { course, update } = useCreateCourse()
  const { lectures } = course

  // edit lecture
  const [dialog, show] = useState(false)
  const editting = useRef(null)

  return (
    <div>
      <Box display="flex" alignItems="center" color="info.main">
        <Typography color="textPrimary" className={styles.header}>
          This Course Contains
        </Typography>
        <Tooltip title="Add new lecture" placement="right">
          <IconButton
            color="inherit"
            onClick={() => {
              editting.current = null
              show(true)
            }}
          >
            <AddCircle />
          </IconButton>
        </Tooltip>
      </Box>
      <ul
        className={clsx({
          [styles.empty]: lectures.length === 0
        })}
      >
        {lectures.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Typography color="textSecondary" variant="h5" align="center">
              <em>
                Your course doesn&apos;t have any lecture. Let&apos;s add one
              </em>
            </Typography>
            <Box padding={1} />
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                editting.current = null
                show(true)
              }}
            >
              Add lecture
            </Button>
          </Box>
        )}
        {lectures.map((item, index) => (
          <Box display="flex" key={item.title} alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                disableFocusRipple
                disableTouchRipple
                disableRipple
                disabled={index === 0}
                onClick={() => {
                  swap(lectures, index, index - 1)
                  update({ lectures })
                }}
              >
                <KeyboardArrowUp />
              </IconButton>
              <Typography>{index + 1}</Typography>
              <IconButton
                disabled={index === lectures.length - 1}
                onClick={() => {
                  swap(lectures, index, index + 1)
                  update({ lectures })
                }}
              >
                <KeyboardArrowDown />
              </IconButton>
            </Box>
            <Paper style={{ flexGrow: 1 }}>
              <LectureItem lecture={item} />
            </Paper>
            <Box display="flex" flexDirection="column">
              <IconButton
                onClick={() => {
                  editting.current = { item: item, index }
                  show(true)
                }}
              >
                <Create />
              </IconButton>
              <IconButton
                onClick={() => {
                  lectures.splice(index, 1)
                  update({ lectures })
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
      </ul>
      <Dialog open={dialog} maxWidth="md" fullWidth onClose={() => show(false)}>
        <LectureDialog
          lecture={editting.current?.item}
          onDone={(lecture) => {
            if (editting.current) lectures[editting.current.index] = lecture
            else lectures.push(lecture)

            update({ lectures })
            show(false)
          }}
          onCancel={() => show(false)}
        />
      </Dialog>
    </div>
  )
}

function swap(array, x, y) {
  const temp = array[x]
  array[x] = array[y]
  array[y] = temp
}
