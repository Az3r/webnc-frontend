import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography
} from '@material-ui/core'
import { VideoCall } from '@material-ui/icons'
import { useCourseThumbnail } from './thumbnail.component'
import useStyles from './lecture.style'
import { formatDuration } from '@/utils/tools'
import { LecturePropTypes } from '@/utils/typing'

export default function LectureItem({ lecture }) {
  const { title, preview, duration } = lecture
  const { play } = useCourseThumbnail()
  const styles = useStyles()

  return (
    <ListItem
      button={preview}
      onClick={() => {
        if (preview) return play(lecture)
      }}
      component="li"
    >
      <ListItemIcon className={styles.list_icon}>
        {preview && (
          <Tooltip title="This lecture is previewable">
            <VideoCall className={styles.preview} />
          </Tooltip>
        )}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ className: styles.text }}
        primary={title}
      />
      <ListItemSecondaryAction>
        <Typography>{formatDuration(duration)}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

LectureItem.propTypes = {
  lecture: LecturePropTypes.isRequired
}
