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
import {
  toLibraryCoursePropTypes,
  toWatchCoursePropTypes
} from '@/utils/conversion'
import { CourseCardLibrary } from '@/components/course/course-card'
import { useRouter } from 'next/router'
import { CourseLibraryPropTypes, LecturePropTypes } from '@/utils/typing'

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

export default function WatchFeature() {
  const router = useRouter()

  const { user } = useAuth((u) => Boolean(u))
  const [courseId, setCourseId] = useState(undefined)
  const [lectureId, setLectureId] = useState(undefined)
  const [playing, setPlaying] = useState(undefined)
  const [isValid, setIsValid] = useState(false)

  const { data: course, loading: courseLoading } = useGetCourse(courseId)
  const { data: library, loading: libraryLoading } = useGetLibrary(user?.id)

  useEffect(() => {
    if (!libraryLoading) {
      // check whether user has a course in his library
      const params = new URLSearchParams(window.location.search)
      params.courseId = params.get('courseId')
      params.lectureId = params.get('lectureId')
      if (!params.courseId) router.replace(routes.u.library)
      else if (!library.find((item) => item.id == params.courseId)) {
        router.replace(routes.course(params.courseId))
      } else {
        setIsValid(true)
      }

      setCourseId(params.courseId)
      setLectureId(params.lectureId)
    }
  }, [libraryLoading])

  useEffect(() => {
    if (!courseLoading) {
      const found = course.lectures.findIndex((item) => item.id == lectureId)
      setPlaying(Math.max(0, found))
    }
  }, [courseLoading])

  return (
    <DefaultLayout>
      <Head>
        <title>Watch Course | {appname}</title>
      </Head>
      {isValid && !courseLoading && !libraryLoading && playing != undefined && (
        <Content course={course} library={library} startIndex={playing} />
      )}
    </DefaultLayout>
  )
}

function Content({ course, library, startIndex }) {
  const styles = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const { title, lectures } = course

  const { user } = useAuth((user) => Boolean(user))
  const [playing, setPlaying] = useState(startIndex)
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
    })
    if (playing < lectures.length) setPlaying(playing + 1)
  }

  return (
    <>
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
              url={lectures[playing].url}
            />
            <Box paddingY={1}>
              <Typography variant="h5">
                {title} - {lectures[playing].title}
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
                  key={item.id}
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
    </>
  )
}

function useGetCourse(id) {
  const { data, ...props } = useGET(() =>
    id ? resources.courses.get(id) : undefined
  )
  if (!data) return { data, ...props }

  const course = toWatchCoursePropTypes(data)
  return { data: course, ...props }
}

function useGetLibrary(userId) {
  const { data, ...props } = useGET(() =>
    userId ? resources.library.get(userId) : undefined
  )
  if (!data) return { data: [], ...props }
  const library = data.map(toLibraryCoursePropTypes)
  return { data: library, ...props }
}

Content.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    lectures: PropTypes.arrayOf(LecturePropTypes.isRequired)
  }).isRequired,
  library: PropTypes.arrayOf(CourseLibraryPropTypes).isRequired,
  startIndex: PropTypes.number.isRequired
}
