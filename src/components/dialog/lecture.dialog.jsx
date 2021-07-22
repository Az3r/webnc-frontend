import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core'
import { LecturePropTypes } from '@/utils/typing'

const useStyles = makeStyles((theme) => ({
  form: {
    ['& > *']: {
      margin: theme.spacing(1, 0)
    },
    ['& > *:first-child']: {
      margin: theme.spacing(0, 0, 1, 0)
    }
  },
  duration: {
    ['& > *']: {
      margin: theme.spacing(0, 1)
    },
    ['&:first-child']: {
      margin: theme.spacing(0, 0, 0, 1)
    },
    ['&:last-child']: {
      margin: theme.spacing(0, 1, 0, 0)
    }
  }
}))

export default function CreateLectureDialog({ onConfirm, onClose, ...props }) {
  const styles = useStyles()

  const [title, setTitle] = useState('')
  const [video, setVideo] = useState('')
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  function onSubmit(e) {
    e.preventDefault()

    onConfirm?.({
      title: title,
      duration: minute * 60 + second,
      url: video
    })

    // reset to default state
    setTitle('')
    setVideo('')
    setMinute(0)
    setSecond(0)

    onClose?.()
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Add new Lecture</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent className={styles.form}>
          <TextField
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => e.target.select()}
            label="Lecture's title"
            placeholder="A title should be short and expressive."
            name="title"
          />
          <TextField
            fullWidth
            required
            type="url"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            onFocus={(e) => e.target.select()}
            label="Video's url"
            placeholder="https://www.youtube.com/watch?v=zrAUfgESlcI"
            name="video"
          />
          <Typography variant="caption" color="textSecondary">
            Duration *
          </Typography>
          <Box display="flex" alignItems="center" className={styles.duration}>
            <InputBase
              type="number"
              name="minute"
              required
              value={minute}
              onChange={(e) => setMinute(e.target.valueAsNumber)}
              onFocus={(e) => e.target.select()}
              inputProps={{
                min: 0,
                style: { textAlign: 'center' }
              }}
              placeholder="00"
            />
            minutes
            <InputBase
              type="number"
              name="second"
              required
              value={second}
              onChange={(e) => {
                const number = e.target.valueAsNumber || 0
                setMinute((prev) =>
                  prev
                    ? prev + Math.floor(number / 60)
                    : Math.floor(number / 60)
                )
                setSecond(number % 60)
              }}
              onFocus={(e) => e.target.select()}
              inputProps={{
                min: 1,
                style: { textAlign: 'center' }
              }}
              placeholder="00"
            />
            seconds
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export function EditLectureDialog({
  lecture,
  index,
  onConfirm,
  onClose,
  ...props
}) {
  const styles = useStyles()

  const [title, setTitle] = useState(null)
  const [video, setVideo] = useState(null)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    if (lecture) {
      setTitle(lecture.title)
      setVideo(lecture.url)
      setMinute(Math.floor(lecture.duration / 60))
      setSecond(Math.floor(lecture.duration % 60))
    }
  }, [lecture])

  function onSubmit(e) {
    e.preventDefault()

    onConfirm?.(
      {
        ...lecture,
        title: title,
        duration: minute * 60 + second,
        url: video
      },
      index
    )

    onClose?.()
  }

  return (
    <Dialog open={index != undefined} {...props}>
      <DialogTitle>Add new Lecture</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent className={styles.form}>
          <TextField
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => e.target.select()}
            label="Lecture's title"
            placeholder="A title should be short and expressive."
            name="title"
          />
          <TextField
            fullWidth
            required
            type="url"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            onFocus={(e) => e.target.select()}
            label="Video's url"
            placeholder="https://www.youtube.com/watch?v=zrAUfgESlcI"
            name="video"
          />
          <Typography variant="caption" color="textSecondary">
            Duration *
          </Typography>
          <Box display="flex" alignItems="center" className={styles.duration}>
            <InputBase
              type="number"
              name="minute"
              required
              value={minute}
              onChange={(e) => setMinute(e.target.valueAsNumber)}
              onFocus={(e) => e.target.select()}
              inputProps={{
                min: 0,
                style: { textAlign: 'center' }
              }}
              placeholder="00"
            />
            minutes
            <InputBase
              type="number"
              name="second"
              required
              value={second}
              onChange={(e) => {
                const number = e.target.valueAsNumber || 0
                setMinute((prev) =>
                  prev
                    ? prev + Math.floor(number / 60)
                    : Math.floor(number / 60)
                )
                setSecond(number % 60)
              }}
              onFocus={(e) => e.target.select()}
              inputProps={{
                min: 1,
                style: { textAlign: 'center' }
              }}
              placeholder="00"
            />
            seconds
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

EditLectureDialog.propTypes = {
  lecture: LecturePropTypes,
  index: PropTypes.number,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}

CreateLectureDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
