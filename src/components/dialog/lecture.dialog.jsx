import React, { useState } from 'react'
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

export default function EditLectureDialog({
  lecture,
  onConfirm,
  onClose,
  ...props
}) {
  const styles = useStyles()

  const [title, setTitle] = useState(lecture?.title)
  const [video, setVideo] = useState(lecture?.videoUrl)
  const [desc, setDesc] = useState(lecture?.desc)
  const [minute, setMinute] = useState(
    lecture ? Math.floor(lecture.duration / 60) : 0
  )
  const [second, setSecond] = useState(
    lecture ? Math.floor(lecture.duration % 60) : 0
  )

  function onSubmit(e) {
    e.preventDefault()

    onConfirm?.call(undefined, {
      title,
      desc,
      duration: minute * 60 + second,
      videoUrl: video
    })
    onClose?.call(undefined)

    setTitle(null)
    setDesc(null)
    setVideo(null)
    setMinute(null)
    setSecond(null)
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
          <TextField
            fullWidth
            variant="outlined"
            multiline
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Explain in detail about this lecture, this is optional. "
            name="description"
          />
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

EditLectureDialog.propTypes = {
  lecture: PropTypes.object,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
