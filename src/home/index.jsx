import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import Course from './course.component'

export default function HomePage({ courses }) {
  return (
    <>
      <Banner scrollElementId="123" />
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
