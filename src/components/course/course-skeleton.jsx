import React from 'react'
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useStyles, { COURSE_WIDTH, THUMBNAIL_WIDTH } from './course.style'

export default function SkeletonCourse() {
  const styles = useStyles()
  return (
    <Box width={COURSE_WIDTH} display="flex" flexDirection="column">
      <Skeleton variant="rect" width="100%" height={THUMBNAIL_WIDTH} />
      <CardHeader
        disableTypography
        title={
          <Skeleton width="100%">
            <Typography variant="body2">.</Typography>
            <Typography variant="body2">.</Typography>
          </Skeleton>
        }
        subheader={
          <Skeleton width="100%">
            <Typography variant="body2">.</Typography>
          </Skeleton>
        }
        avatar={
          <Skeleton variant="circle">
            <Avatar />
          </Skeleton>
        }
      />
      <CardContent classes={{ root: styles.content }}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton width="100%">
          <Typography variant="h6">.</Typography>
        </Skeleton>
      </CardContent>
    </Box>
  )
}
