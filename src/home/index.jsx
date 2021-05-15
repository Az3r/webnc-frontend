import React from 'react'
import Banner from '@/home/banner.component'
import { Box } from '@material-ui/core'
import Course from '@/home/course.component'
import PropTypes from 'prop-types'

export default function HomePage({ courses }) {
  return (
    <>
      <Banner />
      <Box height="100vh">
        <Course {...courses[0]} />
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
