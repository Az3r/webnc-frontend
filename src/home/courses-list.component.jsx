import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Course from '@/home/course.component'
import { Box, IconButton, useMediaQuery, useTheme } from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

export default function CourseList({ courses }) {
  const theme = useTheme()

  const uplg = useMediaQuery(theme.breakpoints.up('lg'))
  const course = {
    height: uplg ? 280 : 240,
    width: uplg ? 369 : 369 * 0.8
  }

  const [spring, api] = useSpring(() => ({ x: 0, config: config.slow }))

  // store list's width for scrolling calculation
  const listRef = useRef({ offsetWidth: 0 })

  // Set the drag hook and define component movement based on gesture data
  const { current: scroll } = useRef({ cached: 0, x: 0 })
  const bind = useDrag(({ delta: [dx] }) => {
    drag(dx)
  })

  //
  // EVENT HANDLERS
  //

  /** scroll the list */
  function drag(dx) {
    const {
      current: { offsetWidth: width }
    } = listRef

    // given current width, get number of item per scroll
    const items = Math.floor(width / course.width)

    // find the first item of the last page
    const last = Math.floor(courses.length / items) * items

    // clamp so not shooting
    const value = move(scroll.x, dx, -last * course.width, 0)

    // perform animation
    scroll.x = value
    api.start({ x: scroll.x })
  }

  /** slide the list to next or previous page */
  function slide(direction) {
    const {
      current: { offsetWidth: width }
    } = listRef

    // number of item per scroll
    const items = Math.floor(width / course.width)

    // given current width, find the first item of the last page
    const last = Math.floor(courses.length / items) * items

    // calculate how many pixel to move
    const value = move(
      Math.round(scroll.x / course.width) * course.width,
      direction * items * course.width,
      -last * course.width,
      0
    )

    // perform animation
    scroll.x = value
    api.start({ x: scroll.x })
  }

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => slide(1)}>
        <NavigateBefore fontSize="large" />
      </IconButton>
      <Box
        paddingTop={1}
        paddingBottom={1}
        flexGrow="1"
        overflow="hidden"
        position="relative"
        cursor="pointer"
        ref={listRef}
        {...bind()}
      >
        <animated.div style={{ ...spring, width: '6000px' }}>
          {courses.map((item, index) => (
            <Box
              key={item.id}
              display="inline-block"
              style={{ userSelect: 'none' }}
              paddingLeft={index > 0 ? 1 : 0}
              paddingRight={index < courses.length - 1 ? 1 : 0}
              flexShrink={0}
              width={`${course.width}px`}
              height={`${course.height}px`}
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
            position: 'absolute'
          }}
        />
      </Box>
      <IconButton onClick={() => slide(-1)}>
        <NavigateNext fontSize="large" />
      </IconButton>
    </Box>
  )
}

// move the list component
function move(x, dx, min, max) {
  const value = Math.min(max, Math.max(dx + x, min))
  return value
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
}

CourseList.defaultProps = {
  courses: []
}
