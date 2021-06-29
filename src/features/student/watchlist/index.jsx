import CourseRow, { CourseRowSkeleton } from '@/components/course/course-row'
import PropTypes from 'prop-types'
import { useAuth } from '@/components/hooks/auth.provider'
import { resources, useGET } from '@/utils/api'
import { CoursePropTypes } from '@/utils/typing'
import { Box, Grid, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  ul: {
    ['& > li']: {
      margin: theme.spacing(1, 0)
    }
  },
  root: {
    minHeight: '80vh'
  }
}))

export default function WatchlistFeature() {
  const styles = useStyles()
  const { user } = useAuth()
  const { data, loading } = useGET(() => resources.watchlist.get(user.id))
  return (
    <Container className={styles.root}>
      <Box paddingY={2}>
        {loading && <LoadingList />}
        {data && <DataAvailable courses={data} />}
      </Box>
    </Container>
  )
}

function LoadingList() {
  const styles = useStyles()
  return (
    <ul className={styles.ul}>
      {[0, 1, 2, 3, 4].map((item, index) => (
        <li key={index}>
          <CourseRowSkeleton />
        </li>
      ))}
    </ul>
  )
}

function DataAvailable({ courses }) {
  const styles = useStyles()
  return (
    <ul className={styles.ul}>
      {courses.map((item, index) => (
        <li key={item.id}>
          <CourseRow course={item} />
        </li>
      ))}
    </ul>
  )
}

DataAvailable.propTypes = {
  courses: PropTypes.arrayOf(CoursePropTypes.isRequired).isRequired
}
