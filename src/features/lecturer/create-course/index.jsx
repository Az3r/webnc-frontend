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

export default function CourseDetail() {
  const styles = useStyles()

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
        <Typography className={styles.header}>Course Content</Typography>
        <Paper>
          <List className={styles.preview_list}>
            <ListItem button divider>
              <ListItemIcon>
                <VideoCall />
              </ListItemIcon>
              <ListItemText
                primary="setup"
                primaryTypographyProps={{ className: styles.preview_title }}
              />
              <ListItemSecondaryAction>
                <Typography>3:21</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VideoCall />
              </ListItemIcon>
              <ListItemText primary="Hello, World!" />
              <ListItemSecondaryAction>
                <Typography>3:21</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <Box paddingTop={1} />
        <Typography className={styles.header}>What you will learn</Typography>
        <Box paddingTop={1} />
        <Typography className={styles.header}>Related Topics</Typography>
        <Box paddingTop={1} />
        <Typography className={styles.header}>Instructor</Typography>
        <Box display="flex" paddingY={2}>
          <Avatar className={styles.instructor_avatar} />
          <Box paddingX={1}>
            <Typography variant="h6" className={styles.instructor_name}>
              Instructor&apos;s name, 1 line, clickable
            </Typography>
            <Typography className={styles.instructor_work}>
              work, 1 line
            </Typography>
          </Box>
        </Box>
        <LongParagraph>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </LongParagraph>
        <Box paddingTop={1} />
        <Typography className={styles.header}>Reviews</Typography>
        <ul>
          <Box component="li">
            <Box display="flex" paddingY={2} alignItems="center">
              <Avatar className={styles.review_avatar} />
              <Box paddingX={1}>
                <Box display="flex">
                  <Typography
                    variant="subtitle1"
                    className={styles.review_name}
                  >
                    Review&apos;s name
                  </Typography>
                  <Box paddingLeft={1} />
                  <Typography
                    variant="subtitle1"
                    className={styles.review_time}
                  >
                    2 days ago
                  </Typography>
                </Box>
                <Rating value={5} precision={0.5} readOnly />
              </Box>
            </Box>
            <LongParagraph>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </LongParagraph>
            <Box paddingY={1}>
              <Divider />
            </Box>
          </Box>
          <Box component="li">
            <Box display="flex" paddingY={2} alignItems="center">
              <Avatar className={styles.review_avatar} />
              <Box paddingX={1}>
                <Box display="flex">
                  <Typography
                    variant="subtitle1"
                    className={styles.review_name}
                  >
                    Review&apos;s name
                  </Typography>
                  <Box paddingLeft={1} />
                  <Typography
                    variant="subtitle1"
                    className={styles.review_time}
                  >
                    2 days ago
                  </Typography>
                </Box>
                <Rating value={5} precision={0.5} readOnly />
              </Box>
            </Box>
            <LongParagraph>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </LongParagraph>
            <Box paddingY={1}>
              <Divider />
            </Box>
          </Box>
        </ul>
      </Container>
    </CreateCourseProvider>
  )
}
