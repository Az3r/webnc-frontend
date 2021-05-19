import React, { useState, useRef, useEffect, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Course from '@/home/course.component'
import {
  Box,
  Hidden,
  IconButton,
  MobileStepper,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

export default function CourseList({ courses }) {
  const theme = useTheme()

  const xsdown = useMediaQuery(theme.breakpoints.down('xs'))

  const lgup = useMediaQuery(theme.breakpoints.up('lg'))
  const course = {
    height: lgup ? 280 : 248,
    width: lgup ? 369 : 369 * 0.8
  }

  const { current: scroll } = useRef({ x: 0, item: 0 })

  // store list's width for scrolling calculation
  const listRef = useRef({ offsetWidth: 0 })

  const [spring, api] = useSpring(() => ({
    x: scroll.item * course.width,
    config: config.slow
  }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ last: up, delta: [dx] }) => {
    drag(dx, up)
  })

  const [status, setStatus] = useState({ next: true, before: false, item: 0 })

  useEffect(() => {
    scroll.x = Math.floor(scroll.item) * course.width
    api.start({ x: scroll.x })
  }, [lgup, xsdown])

  //
  // EVENT HANDLERS
  //

  /** scroll the list */
  const drag = useCallback(
    (dx, up) => {
      const {
        current: { offsetWidth: width }
      } = listRef

      if (!xsdown && width < course.width) return

      // given current width, get number of item per scroll
      const items = xsdown ? 1 : Math.floor(width / course.width)

      // find the first item of the last page
      const last = Math.floor((courses.length - 0.00001) / items) * items

      // clamp so not shooting
      const value = move(scroll.x, dx, -last * course.width, 0)

      // perform animation
      if (up) {
        // mouse up event, when user has finished dragging, snap to nearest item
        scroll.item = Math.round(value / course.width)
        scroll.x = scroll.item * course.width
        api.start({ x: scroll.x })
      } else {
        scroll.item = value / course.width
        scroll.x = value
        api.start({ x: scroll.x })
      }

      // update stepper
      const item = -Math.round(scroll.item)
      const next = item < last
      const before = Math.floor(scroll.x) < 0
      setStatus({ item, next, before })
    },
    [course]
  )

  /** slide the list to next or previous page */
  const slide = useCallback(
    (direction) => {
      const {
        current: { offsetWidth: width }
      } = listRef

      if (!xsdown && width < course.width) return

      // number of item per scroll
      const items = xsdown ? 1 : Math.floor(width / course.width)

      // given current width, find the first item of the last page
      const last = Math.floor((courses.length - 0.00001) / items) * items

      // calculate how many pixel to move
      const value = move(
        Math.round(scroll.x / course.width) * course.width,
        direction * items * course.width,
        -last * course.width,
        0
      )

      // perform animation
      scroll.x = value
      scroll.item = value / course.width
      scroll.last = last

      const item = -Math.floor(scroll.item)
      const next = item < last
      const before = Math.floor(value) < 0

      api.start({ x: scroll.x })
      setStatus({ item, next, before })
    },
    [course]
  )

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
      flexDirection={xsdown ? 'column' : 'row'}
    >
      <Hidden xsDown>
        <BeforeButton />
      </Hidden>
      <Box
        flexGrow={xsdown ? undefined : 1}
        overflow="hidden"
        position="relative"
        width={xsdown ? course.width : undefined}
        height={course.height + 4}
        margin={xsdown ? 'auto' : undefined}
        ref={listRef}
        {...bind()}
      >
        <animated.div
          style={{
            ...spring,
            display: 'flex',
            width: '6000px',
            userSelect: 'none',
            cursor: 'pointer'
          }}
        >
          <MemoizedList
            courses={courses}
            width={course.width}
            height={course.height}
          />
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

function List({ courses, width, height }) {
  return (
    <>
      {courses.map((item, index) => (
        <Box
          key={item.id}
          paddingLeft={index > 0 ? 1 : 0}
          paddingRight={index < courses.length - 1 ? 1 : 0}
          flexShrink={0}
          width={width}
          height={height}
        >
          <Course {...item} />
        </Box>
      ))}
    </>
  )
}

const MemoizedList = memo(
  List,
  (prev, next) => prev.width === next.width && prev.height === next.height
)

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
