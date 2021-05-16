import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import Course from './course.component'
import CourseList from '@/home/courses-list.component'

export default function HomePage({ courses }) {
  return (
    <>
      <Banner scrollElementId="123" />
      <Box height="100vh">
        <CourseList courses={courses.slice(0, 5)} />
      </Box>
    </>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
