import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Box,
  Typography,
  Checkbox,
  Tooltip,
  TextField,
  InputBase,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputAdornment,
  FormGroup,
  Grid
} from '@material-ui/core'
import { AccessTime, VideoCall } from '@material-ui/icons'
import useStyles from './create-lecture.style'

export default function LectureDialog({ lecture, onDone, onCancel }) {
  const styles = useStyles()

  const [title, setTitle] = useState(lecture.title)
  const [url, setUrl] = useState(lecture.url)
  const [desc, setDesc] = useState(lecture.desc)
  const [preview, setPreview] = useState(lecture.preview)
  const [hour, setHour] = useState(lecture.hour)
  const [minute, setMinute] = useState(lecture.minute)
  const [second, setSecond] = useState(lecture.second)

  function submit(e) {
    e.preventDefault()
    onDone({ title, url, desc, preview, hour, minute, second })
  }

  return (
    <form onSubmit={submit} noValidate>
      <DialogTitle>Add New Lecture</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onFocus={(e) => e.target.select()}
              required
              autoFocus
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onFocus={(e) => e.target.select()}
              type="url"
              label="Video's Url"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Enable preview" placement="top">
                    <InputAdornment position="end">
                      <Checkbox
                        value={preview}
                        onChange={(e) => setPreview(e.target.checked)}
                        icon={<VideoCall />}
                        checkedIcon={<VideoCall className={styles.preview} />}
                      />
                    </InputAdornment>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row className={styles.form_duration}>
              <Box color="text.secondary" paddingRight={1}>
                <Tooltip title="Lecture's duration" placement="top">
                  <AccessTime />
                </Tooltip>
              </Box>
              <InputBase
                type="number"
                required
                onFocus={(e) => e.target.select()}
                value={hour}
                onChange={(e) => setHour(e.target.valueAsNumber)}
                inputProps={{ min: 0, max: 23, style: { textAlign: 'center' } }}
                placeholder="00"
                className={styles.input_duration}
              />
              <Box paddingX={0.5}>
                <Typography align="center">h</Typography>
              </Box>
              <InputBase
                type="number"
                required
                value={minute}
                onChange={(e) => setMinute(e.target.valueAsNumber)}
                onFocus={(e) => e.target.select()}
                inputProps={{
                  min: 0,
                  max: 59,
                  step: 15,
                  style: { textAlign: 'center' }
                }}
                placeholder="00"
                className={styles.input_duration}
              />
              <Box paddingX={0.5}>
                <Typography>m</Typography>
              </Box>
              <InputBase
                type="number"
                required
                value={second}
                onChange={(e) => setSecond(e.target.valueAsNumber)}
                onFocus={(e) => e.target.select()}
                inputProps={{
                  min: 0,
                  max: 59,
                  step: 15,
                  style: { textAlign: 'center' }
                }}
                placeholder="00"
                className={styles.input_duration}
              />
              <Box paddingX={0.5}>
                <Typography>s</Typography>
              </Box>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              placeholder="What is this lecture about?"
              fullWidth
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              multiline
              rows={2}
              rowsMax={5}
            />
          </Grid>
        </Grid>
        <Box padding={2} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" style={{ width: 120 }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 120 }}
        >
          {lecture ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  )
}

LectureDialog.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    preview: PropTypes.bool,
    desc: PropTypes.string,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    second: PropTypes.number.isRequired
  }),
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

LectureDialog.defaultProps = {
  lecture: {
    url: '',
    title: '',
    preview: false,
    desc: '',
    hour: 0,
    minute: 0,
    second: 0
  }
}
