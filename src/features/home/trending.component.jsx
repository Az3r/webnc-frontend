import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { animated } from '@react-spring/web'
import CourseList from './courses-list.component'

export default function TopTrending({ courses }) {
  return (
    <animated.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Typography variant="h4">Top trending</Typography>
      <CourseList courses={courses} />
    </animated.div>
  )
}

TopTrending.propTypes = {
  courses: PropTypes.array
}

TopTrending.defaultProps = {
  courses: []
}
