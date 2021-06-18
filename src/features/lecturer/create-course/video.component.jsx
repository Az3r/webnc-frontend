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
  Grid
} from '@material-ui/core'
import {
  AccessTime,
  AddCircle,
  KeyboardArrowDown,
  VideoCall
} from '@material-ui/icons'
import useStyles from './video.style'

export default function UpdateVideo() {
  const styles = useStyles()

  const [dialog, show] = useState(false)

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
      </Box>
      <Paper>
        <List className={styles.preview_list}>
          <ListItem>
            <ListItemIcon>
              <Tooltip title="Enable preview" placement="top">
                <Checkbox
                  checkedIcon={<VideoCall className={styles.preview} />}
                  icon={<VideoCall />}
                />
              </Tooltip>
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <InputBase
                  inputProps={{ className: styles.placeholder }}
                  placeholder="enter the title of this lecture..."
                  fullWidth
                />
              }
            />
            <ListItemSecondaryAction>
              <Box
                display="flex"
                flexDirection="row-reverse"
                alignItems="center"
              >
                <IconButton>
                  <KeyboardArrowDown />
                </IconButton>
                <Typography>3:21</Typography>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={true}>
            <ListItem>
              <ListItemText>
                <TextField
                  fullWidth
                  variant="outlined"
                  rows={2}
                  rowsMax={2}
                  multiline
                  placeholder="What is this lecture about?"
                />
              </ListItemText>
            </ListItem>
          </Collapse>
        </List>
      </Paper>
      <Dialog open={dialog} maxWidth="md" fullWidth onClose={() => show(false)}>
        <VideoDialog onDone={() => show(false)} />
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
    <form onSubmit={submit}>
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
