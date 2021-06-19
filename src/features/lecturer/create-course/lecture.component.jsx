import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './lecture.style'
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'
import { VideoCall } from '@material-ui/icons'

export default function LectureItem({ lecture }) {
  const styles = useStyles()
  return (
    <ListItem>
      <ListItemIcon className={styles.list_icon}>
        {lecture.preview && <VideoCall className={styles.preview} />}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ className: styles.text }}
        secondaryTypographyProps={{ className: styles.text }}
        primary={lecture.title}
        secondary={lecture.desc}
      />
      <Box paddingLeft={2}>
        <Typography>
          {formatDuration(lecture.hour, lecture.minute, lecture.second)}
        </Typography>
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
