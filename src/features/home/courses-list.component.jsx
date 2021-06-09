import React, { useState, useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Hidden,
  IconButton,
  MobileStepper,
  useMediaQuery
} from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { Course } from '@/components/course'
import { COURSE_WIDTH } from '@/components/course/course'

export default function CourseList({ courses }) {
  const xsdown = useMediaQuery((theme) => theme.breakpoints.down('xs'))

  const { current: scroll } = useRef({ x: 0, item: 0 })

  // store list's width for scrolling calculation
  const listRef = useRef({ offsetWidth: 0 })

  const [spring, api] = useSpring(() => ({
    x: scroll.item * COURSE_WIDTH,
    config: config.slow
  }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ last: up, delta: [dx] }) => {
      drag(dx, up)
    },
    { axis: 'x' }
  )

  const [status, setStatus] = useState({ next: true, before: false, item: 0 })
  const [mouse, setMouse] = useState({ down: false })

  useEffect(() => {
    scroll.x = Math.floor(scroll.item) * COURSE_WIDTH
    api.start({ x: scroll.x })
  }, [xsdown])

  //
  // EVENT HANDLERS
  //

  /** scroll the list */
  function drag(dx, up) {
    const {
      current: { offsetWidth: width }
    } = listRef

    if (!xsdown && width < COURSE_WIDTH) return

    // given current width, get number of item per scroll
    const items = xsdown ? 1 : Math.floor(width / COURSE_WIDTH)

    // find the first item of the last page
    const last = Math.floor((courses.length - 0.00001) / items) * items

    // clamp so not shooting
    const value = move(scroll.x, dx, -last * COURSE_WIDTH, 0)

    // perform animation
    if (up) {
      // mouse up event, when user has finished dragging, snap to nearest item
      scroll.item = Math.round(value / COURSE_WIDTH)
      scroll.x = scroll.item * COURSE_WIDTH
    } else {
      scroll.item = value / COURSE_WIDTH
      scroll.x = value
    }

    api.start({ x: scroll.x })
    // update stepper
    const item = -Math.round(scroll.item)
    const next = item < last
    const before = Math.floor(scroll.x) < 0
    setStatus({ item, next, before })
  }

  /** slide the list to next or previous page */
  function slide(direction) {
    const {
      current: { offsetWidth: width }
    } = listRef

    if (!xsdown && width < COURSE_WIDTH) return

    // number of item per scroll
    const items = xsdown ? 1 : Math.floor(width / COURSE_WIDTH)

    // given current width, find the first item of the last page
    const last = Math.floor((courses.length - 0.00001) / items) * items

    // calculate how many pixel to move
    const value = move(
      Math.round(scroll.x / COURSE_WIDTH) * COURSE_WIDTH,
      direction * items * COURSE_WIDTH,
      -last * COURSE_WIDTH,
      0
    )

    // perform animation
    scroll.x = value
    scroll.item = value / COURSE_WIDTH
    scroll.last = last

    const item = -Math.floor(scroll.item)
    const next = item < last
    const before = Math.floor(value) < 0

    api.start({ x: scroll.x })
    setStatus({ item, next, before })
  }

  //
  // COMPONENTS
  //
  function BeforeButton() {
    return (
      <IconButton disabled={!status.before} onClick={() => slide(1)}>
        <NavigateBefore fontSize="large" />
      </IconButton>
    )
  }

  function NextButton() {
    return (
      <IconButton disabled={!status.next} onClick={() => slide(-1)}>
        <NavigateNext fontSize="large" />
      </IconButton>
    )
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={xsdown ? 'column' : 'row'}
    >
      <Hidden xsDown>
        <BeforeButton />
      </Hidden>
      <Box
        flexGrow={xsdown ? undefined : 1}
        overflow="hidden"
        position="relative"
        width={xsdown ? COURSE_WIDTH : undefined}
        margin={xsdown ? 'auto' : undefined}
        ref={listRef}
        {...bind()}
        onMouseDown={() => setMouse({ down: true })}
        onMouseUp={() => setMouse({ down: false })}
        style={{
          cursor: mouse.down ? 'grab' : 'auto',
          userSelect: mouse.down ? 'none' : 'auto'
        }}
      >
        <animated.div
          style={{
            ...spring,
            display: 'flex',
            width: '6000px'
          }}
        >
          <MemoizedList courses={courses} />
        </animated.div>
        <Hidden xsDown>
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
        </Hidden>
      </Box>
      <Hidden xsDown>
        <NextButton />
      </Hidden>
      <Hidden smUp>
        <MobileStepper
          variant="dots"
          steps={courses.length}
          position="static"
          activeStep={status.item}
          nextButton={<NextButton />}
          backButton={<BeforeButton />}
        />
      </Hidden>
    </Box>
  )
}

function List({ courses }) {
  return (
    <>
      {courses.map((item, index) => (
        <Box
          component="li"
          key={item.id}
          paddingLeft={index > 0 ? 1 : 0}
          paddingRight={index < courses.length - 1 ? 1 : 0}
          flexShrink={0}
        >
          <Course {...item} />
        </Box>
      ))}
    </>
  )
}

const MemoizedList = memo(List)

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

List.propTypes = {
  courses: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

List.defaultProps = {
  courses: []
}
