import CourseRow, { CourseRowSkeleton } from '@/components/course/course-row'
import PropTypes from 'prop-types'
import { useAuth } from '@/components/hooks/auth.provider'
import { resources, useGET } from '@/utils/api'
import { CoursePropTypes } from '@/utils/typing'
import { Box, Container, makeStyles } from '@material-ui/core'
import React from 'react'
import DefaultLayout from '@/components/layout'

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
  const { data, loading } = useGET(() =>
    user ? resources.watchlist.get(user.id) : undefined
  )
  return (
    <DefaultLayout>
      <Container className={styles.root}>
        <Box paddingY={2}>
          {loading && <LoadingList />}
          {data && <DataAvailable courses={data} />}
        </Box>
      </Container>
    </DefaultLayout>
  )
}

function LoadingList() {
  const styles = useStyles()
  return (
    <ul className={styles.ul}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
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
