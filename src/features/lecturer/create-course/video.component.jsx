import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Checkbox,
  Tooltip,
  TextField,
  InputBase,
  IconButton,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputAdornment,
  FormGroup,
  Grid,
  Divider
} from '@material-ui/core'
import {
  AccessTime,
  AddCircle,
  DeleteForever,
  KeyboardArrowDown,
  VideoCall
} from '@material-ui/icons'
import useStyles from './video.style'

export default function UpdateVideo() {
  const styles = useStyles()

  const [dialog, show] = useState(false)
  const [lectures, setLectures] = useState([])

  return (
    <Box>
      <Box display="flex" alignItems="center" color="info.main">
        <Typography color="textPrimary" className={styles.header}>
          This Course Contains
        </Typography>
        <Tooltip title="Add new lecture" placement="right">
          <IconButton color="inherit" onClick={() => show(true)}>
            <AddCircle />
          </IconButton>
        </Tooltip>
        {lectures.length > 0 && (
          <Tooltip title="Add new lecture" placement="right">
            <Box color="error.main">
              <IconButton color="inherit" onClick={() => setLectures([])}>
                <DeleteForever />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Box>
      <Paper>
        <List>
          {lectures.map((item) => (
            <>
              <ListItem>
                <ListItemIcon className={styles.list_icon}>
                  {item.preview && <VideoCall className={styles.preview} />}
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: styles.list_primary }}
                  primary={item.title}
                  secondary={
                    `${
                      item.hour && item.hour.toString().padStart(2, '0') + ':'
                    }` +
                    `${
                      item.minute
                        ? item.minute.toString().padStart(2, '0')
                        : '00'
                    }:` +
                    `${
                      item.second
                        ? item.second.toString().padStart(2, '0')
                        : '00'
                    }:`
                  }
                />
                {item.desc && (
                  <IconButton>
                    <KeyboardArrowDown />
                  </IconButton>
                )}
              </ListItem>
              {item.desc && (
                <Collapse in={true}>
                  <ListItem dense>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'body1' }}
                      primary={item.desc}
                    />
                  </ListItem>
                </Collapse>
              )}
            </>
          ))}
        </List>
      </Paper>
      <Dialog open={dialog} maxWidth="md" fullWidth onClose={() => show(false)}>
        <VideoDialog
          onDone={(lecture) => {
            setLectures((prev) => {
              prev.push(lecture)
              return prev
            })
            show(false)
          }}
          onCancel={() => show(false)}
        />
      </Dialog>
    </Box>
  )
}

function VideoDialog({ onDone, onCancel }) {
  const styles = useStyles()

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [preview, setPreview] = useState(false)
  const [hour, setHour] = useState(null)
  const [minute, setMinute] = useState(null)
  const [second, setSecond] = useState(null)

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
          Add
        </Button>
      </DialogActions>
    </form>
  )
}

VideoDialog.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}
