import React from 'react'
import {
  Paper,
  Typography,
  Container,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
  List
} from '@material-ui/core'
import useStyles from './create-course.style'
import { Rating } from '@material-ui/lab'
import { VideoCall } from '@material-ui/icons'
import LongParagraph from '@/components/paragraph'
import CreateCourseProvider from './create-course.context'
import UploadThumbnail from './thumbnail.component'
import UpdateInfo from './info.component'
import UpdateVideo from './video.component'
import UpdateDetail from './detail.component'

export default function CourseDetail() {
  return (
    <CreateCourseProvider>
      <Container>
        <UploadThumbnail />
        <Box paddingY={2}>
          <UpdateInfo />
          <Button fullWidth variant="contained" color="primary">
            add to cart
          </Button>
        </Box>
        <Divider />
        <Box paddingTop={1} />
        <UpdateVideo />
        <Box paddingTop={1} />
        <UpdateDetail />
      </Container>
    </CreateCourseProvider>
  )
}
