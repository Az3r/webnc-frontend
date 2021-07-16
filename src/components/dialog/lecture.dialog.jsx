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

export default function EditLectureDialog({ lecture, ...props }) {
  const styles = useStyles()

  const [title, setTitle] = useState(lecture?.title)
  const [desc, setDesc] = useState(lecture?.desc)
  const [minute, setMinute] = useState(
    lecture?.duration && Math.floor(lecture.duration / 60)
  )
  const [second, setSecond] = useState(
    lecture?.duration && Math.floor(lecture.duration % 60)
  )

  function onSubmit(e) {
    e.preventDefault()
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Add Le const [cture</DialogTitle>
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
          <Typography variant="caption" color="textSecondary">
            Duration *
          </Typography>
          <Box display="flex" alignItems="center" className={styles.duration}>
            <InputBase
              type="number"
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
              required
              value={second}
              onChange={(e) => setSecond(e.target.valueAsNumber)}
              onFocus={(e) => e.target.select()}
              inputProps={{
                min: 0,
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
          <Button autoFocus>Cancel</Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

EditLectureDialog.propTypes = {
  lecture: PropTypes.object
}
