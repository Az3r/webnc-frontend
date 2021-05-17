import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Course from '@/home/course.component'
import { Box, IconButton } from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

export default function CourseList({ courses }) {
  const MAX_WIDTH = 1440
  const COURSE_HEIGHT = 300
  const COURSE_WIDTH = 369
  const ITEM_PADDING = 8
  const ITEM_PER_PAGE = Math.floor(MAX_WIDTH / COURSE_WIDTH)
  const LAST_PAGE = Math.floor(courses.length / ITEM_PER_PAGE) * ITEM_PER_PAGE
  const MOVE = COURSE_WIDTH * ITEM_PER_PAGE

  //
  // STATES
  //
  const { current: offset } = useRef({
    x: 0,
    count: -1
  })

  const [visible, setVisible] = useState({
    next: 'hidden',
    previous: 'visible'
  })

  const [spring, api] = useSpring(() => ({ x: offset.x, config: config.slow }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, offset: [x] }) => {
    if (down) {
      api.start({ x })
      offset.x = x
      const item = x / COURSE_WIDTH
      console.log(item)
      if (item <= -LAST_PAGE && offset.count < 1) {
        console.log('1')
        setVisible({ next: 'visible', previous: 'hidden' })
        offset.count = 1
      } else if (item < -1 && item > -LAST_PAGE && offset.count != 0) {
        setVisible({ next: 'visible', previous: 'visible' })
        offset.count = 0
        console.log(0)
      } else if (item >= -1 && offset.count > -1) {
        console.log({ count: offset.count })
        setVisible({ next: 'hidden', previous: 'visible' })
        offset.count = -1
      }
    }
  })

  //
  // EVENT HANDLERS
  //
  function next() {
    if (offset.count < MAX_PAGES) api.start({ x: offset.x - MOVE })
  }

  function previous() {
    if (offset.count > 0)
      api.start({
        x: offset.x + MOVE
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
      <IconButton onClick={previous} style={{ visibility: visible.next }}>
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
        <animated.div {...bind()} style={{ ...spring, display: 'flex' }}>
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
            visibility: 'visible'
          }}
        />
      </div>
      <IconButton
        onClick={next}
        style={{
          visibility: visible.previous
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
