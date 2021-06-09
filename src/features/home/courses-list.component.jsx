import React, { useState, useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Grid,
  Hidden,
  IconButton,
  MobileStepper,
  useMediaQuery
} from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { Course } from '@/components/course'
import { COURSE_WIDTH } from '@/components/course/course.style'

const AnimatedBox = animated(Box)
const ITEM_PADDING = 1
export default function CourseList({ courses }) {
  const ITEM_WIDTH = COURSE_WIDTH + ITEM_PADDING * 8
  const xsdown = useMediaQuery((theme) => theme.breakpoints.down('xs'))

  const { current: scroll } = useRef({ x: 0, item: 0 })

  // store list's width for scrolling calculation
  const listRef = useRef({ offsetWidth: 0 })

  const [spring, api] = useSpring(() => ({
    x: scroll.item * ITEM_WIDTH
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
    scroll.x = Math.floor(scroll.item) * ITEM_WIDTH
    api.start({ x: scroll.x })
  }, [xsdown])

  //
  // EVENT HANDLERS
  //

  /** scroll the list */
  function drag(dx, up) {
    const {
      current: { offsetWidth: listWidth }
    } = listRef

    // do not scroll when screen size is below xs
    if (!xsdown && listWidth < ITEM_WIDTH) return

    // given current width, get number of item per 'slide'
    const items = xsdown ? 1 : Math.floor(listWidth / ITEM_WIDTH)

    // find the first item of the last page
    const last = Math.floor((courses.length - 0.00001) / items) * items

    // clamp so not over shooting
    const value = move(scroll.x, dx, -last * ITEM_WIDTH, 0)

    // perform animation
    if (up) {
      // mouse up event, when user has finished dragging, snap to nearest item
      scroll.item = Math.round(value / ITEM_WIDTH)
      scroll.x = scroll.item * ITEM_WIDTH
    } else {
      scroll.item = value / ITEM_WIDTH
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

    if (!xsdown && width < ITEM_WIDTH) return

    // number of item per scroll
    const items = xsdown ? 1 : Math.floor(width / ITEM_WIDTH)

    // given current width, find the first item of the last page
    const last = Math.floor((courses.length - 0.00001) / items) * items

    // calculate how many pixel to move
    const value = move(
      Math.round(scroll.x / ITEM_WIDTH) * ITEM_WIDTH,
      direction * items * ITEM_WIDTH,
      -last * ITEM_WIDTH,
      0
    )

    // perform animation
    scroll.x = value
    scroll.item = value / ITEM_WIDTH
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
      <Hidden xsDown implementation="css">
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
        <AnimatedBox style={spring} width={6000} display="flex">
          <MemoizedList courses={courses} />
        </AnimatedBox>
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
      <Hidden xsDown implementation="css">
        <NextButton />
      </Hidden>
      <Hidden smUp implementation="css">
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
    <Grid container spacing={1} component="ul">
      {courses.map((item) => (
        <Grid item component="li" key={item.id}>
          <Course {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

const MemoizedList = memo(List, () => true)

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
  courses: PropTypes.array
}

List.defaultProps = {
  courses: []
}
