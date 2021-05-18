import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import CourseList from '@/home/courses-list.component'

export default function TopTrending({ courses }) {
  const [animation, setAnimation] = useState({
    opacity: 1
  })

  const spring = useSpring({
    opacity: animation.opacity,
    config: config.slow
  })

  function onVisibleChanged(visible) {}

  return (
    <animated.div
      style={{
        ...spring,
        display: 'flex',
        flexDirection: 'column'
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
