import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@material-ui/core'
import { VideoCall } from '@material-ui/icons'
import { useCourseThumbnail } from './thumbnail.component'
import useStyles from './lecture.style'

export default function LectureItem({ lecture }) {
  const { desc, title, preview, hour, second, minute } = lecture
  const { play } = useCourseThumbnail()
  const styles = useStyles()
  return (
    <ListItem button={preview} onClick={() => play(lecture)} component="div">
      <ListItemIcon className={styles.list_icon}>
        {preview && (
          <Tooltip title="This lecture is previewable">
            <VideoCall className={styles.preview} />
          </Tooltip>
        )}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ className: styles.text }}
        secondaryTypographyProps={{ className: styles.text }}
        primary={title}
        secondary={desc}
      />
      <Box paddingLeft={2}>
        <Typography>{formatDuration(hour, minute, second)}</Typography>
      </Box>
    </ListItem>
  )
}

LectureItem.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string.isRequired,
    preview: PropTypes.bool,
    desc: PropTypes.string,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    second: PropTypes.number.isRequired
  }).isRequired
}

function formatDuration(hour = 0, minute = 0, second = 0) {
  const secondStr = ':' + second.toString().padStart(2, '0')
  const minuteStr = minute.toString().padStart(2, '0')
  const hourStr = hour > 0 ? hour.toString().padStart(2, '0') + ':' : ''
  return hourStr + minuteStr + secondStr
}
