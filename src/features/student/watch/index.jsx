import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ListItemText,
  ListItem,
  Container,
  Box,
  List,
  makeStyles,
  Paper,
  Typography,
  Fab,
  Tooltip
} from '@material-ui/core'
import { LecturePropTypes } from '@/utils/typing'
import ReactPlayer from 'react-player'
import { formatDuration } from '@/utils/tools'
import DefaultLayout from '@/components/layout'
import Head from 'next/head'
import { appname, routes } from '@/utils/app'
import GridCourses from '@/components/list/course.grid'
import { RateReview } from '@material-ui/icons'
import RatingDialog from '@/components/dialog/rating.dialog'
import { useSnackbar } from 'notistack'
import { useAuth } from '@/components/hooks/auth.provider'
import { fetchPOST, resources, useGET } from '@/utils/api'
import { toLibraryCoursePropTypes } from '@/utils/conversion'
import { CourseCardLibrary } from '@/components/course/course-card'

const useStyles = makeStyles((theme) => ({
  lessons: {
    overflow: 'scroll',
    height: 720
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function WatchFeature({ course }) {
  const styles = useStyles()
  const { lectures, title } = course
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const { user } = useAuth((user) => Boolean(user), routes.course(course.id))

  const { data: courseProcess, mutate } = useGET(() =>
    user ? resources.courseProcess.get(user.id, course.id) : undefined
  )

  const { data } = useGET(() =>
    user ? resources.library.get(user.id) : undefined
  )
  const library = data?.map(toLibraryCoursePropTypes) || []

  const [playing, setPlaying] = useState(0)
  const [dialog, setDialog] = useState(false)

  const key = useRef(undefined)

  useEffect(() => {
    if (lectures) {
      if (key.current) closeSnackbar(key.current)
      key.current = enqueueSnackbar(`Now playing: ${lectures[playing].title}`, {
        variant: 'info',
        onClick: closeSnackbar(key),
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
      })
    }
  }, [playing])

  function onLectureEnded() {
    fetchPOST(resources.courseProcess.post, {
      studentId: user.id,
      courseId: course.id,
      lectureId: lectures[playing].id
    }).then(() => mutate())
    if (playing < lectures.length) setPlaying(playing + 1)
  }

  return (
    <DefaultLayout>
      <Head>
        <title>
          Watch &quot;{title}&quot; | {appname}
        </title>
      </Head>
      <Tooltip title="Review this course">
        <Fab
          color="secondary"
          className={styles.fab}
          onClick={() => setDialog(true)}
        >
          <RateReview />
        </Fab>
      </Tooltip>
      <Container maxWidth="xl">
        <Box paddingY={2} display="flex">
          <Box flexGrow={1}>
            <ReactPlayer
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    controls: 1
                  }
                }
              }}
              playing={true}
              onEnded={onLectureEnded}
              height={720}
              width="100%"
              url={lectures[playing]?.url}
            />
            <Box paddingY={1}>
              <Typography variant="h5">
                {course.title} - {lectures[playing]?.title}
              </Typography>
            </Box>
          </Box>
          <Box padding={2} />
          <Paper
            style={{
              overflow: 'scroll',
              overflowX: 'hidden',
              height: 720,
              maxWidth: 600
            }}
          >
            <Typography align="center" variant="h6">
              {lectures.length} Lectures
            </Typography>
            <List>
              {lectures.map((item, index) => (
                <ListItem
                  selected={index === playing}
                  divider
                  button
                  component="li"
                  key={item.section}
                  onClick={() => setPlaying(index)}
                >
                  <Typography variant="subtitle1">{index + 1}</Typography>
                  <Box paddingX={2} />
                  <ListItemText
                    primary={item.title}
                    secondary={formatDuration(item.duration)}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
      <Container style={{ maxWidth: 1440 }}>
        <Box padding={2} />
        <Typography variant="h4">Courses you are also learning</Typography>
        <Box padding={1} />
        <GridCourses
          skeleton={!library}
          courses={library || [1, 2, 3, 4, 5, 6, 7, 8]}
          Item={CourseCardLibrary}
        />
      </Container>
      <RatingDialog
        open={dialog}
        fullWidth
        maxWidth="sm"
        course={course}
        onClose={() => setDialog(undefined)}
      />
    </DefaultLayout>
  )
}

WatchFeature.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lectures: PropTypes.arrayOf(LecturePropTypes).isRequired
  }).isRequired
}
