import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Course from '@/home/course.component'
import { Box, IconButton } from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'

export default function CourseList({ courses }) {
  const MAX_WIDTH = 1440
  const COURSE_HEIGHT = 300
  const COURSE_WIDTH = 369
  const ITEM_PADDING = 8
  const ITEM_PER_PAGE = Math.floor(MAX_WIDTH / COURSE_WIDTH)
  const MAX_SLIDE_COUNT = Math.floor(courses.length / ITEM_PER_PAGE)
  const MOVE = COURSE_WIDTH * ITEM_PER_PAGE

  //
  // STATES
  //
  const [slide, animateSlide] = useState({
    current: 0,
    destination: 0,
    count: 0
  })

  const spring = useSpring({
    from: { translate3d: `${slide.current}px,0,0` },
    translate3d: `${slide.destination}px,0,0`,
    config: config.slow
  })

  //
  // EVENT HANDLERS
  //
  function next() {
    if (slide.count < MAX_SLIDE_COUNT)
      animateSlide({
        current: slide.destination,
        destination: slide.destination - MOVE,
        count: slide.count + 1
      })
  }

  function previous() {
    if (slide.count > 0)
      animateSlide({
        current: slide.destination,
        destination: slide.destination + MOVE,
        count: slide.count - 1
      })
  }

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <IconButton
        onClick={previous}
        style={{ visibility: slide.count > 0 ? 'visible' : 'hidden' }}
      >
        <NavigateBefore fontSize="large" />
      </IconButton>
      <div
        style={{
          flexGrow: '1',
          maxWidth: `${MAX_WIDTH}px`,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <animated.div style={{ ...spring, display: 'flex' }}>
          {courses.map((item, index) => (
            <Box
              paddingTop={1}
              paddingBottom={1}
              paddingLeft={index > 0 ? `${ITEM_PADDING}px` : 0}
              paddingRight={
                index < courses.length - 1 ? `${ITEM_PADDING}px` : 0
              }
              key={item.id}
              flexShrink={0}
              width={`${COURSE_WIDTH}px`}
              height={`${COURSE_HEIGHT}px`}
              zIndex="-1"
            >
              <Course {...item} />
            </Box>
          ))}
        </animated.div>
        <div
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(225,225,225,0), rgba(225,225,225,1))',
            width: '120px',
            height: '100%',
            top: '0',
            right: '0',
            position: 'absolute',
            visibility: slide.count < MAX_SLIDE_COUNT ? 'visible' : 'hidden'
          }}
        />
      </div>
      <IconButton
        onClick={next}
        style={{
          visibility: slide.count < MAX_SLIDE_COUNT ? 'visible' : 'hidden'
        }}
      >
        <NavigateNext fontSize="large" />
      </IconButton>
    </div>
  )
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
}

CourseList.defaultProps = {
  courses: []
}
