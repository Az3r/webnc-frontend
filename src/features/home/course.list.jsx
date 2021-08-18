import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, makeStyles, MobileStepper } from '@material-ui/core'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { CourseCard } from '@/components/course'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import clsx from 'clsx'

const widths = {
  xs: 320,
  md: 280
}
const useStyles = makeStyles((theme) => ({
  ul: {
    width: (courses) => courses.length * widths.xs
  },
  li: {
    float: 'left',
    padding: theme.spacing(0, 0.5),
    cursor: 'grab',
    width: widths.xs
  },
  tabletUl: {
    [theme.breakpoints.down('md')]: {
      width: (courses) => courses.length * widths.md
    }
  },
  tabletLi: {
    ['&:active']: {
      cursor: 'grabbing'
    },
    [theme.breakpoints.down('md')]: {
      width: widths.md
    }
  }
}))
export default function CourseList({ courses = [] }) {
  const styles = useStyles(courses)

  const [spring, animation] = useSpring(() => ({
    x: 0
  }))

  const offset = useRef(0)
  const lastItem = useRef(undefined)
  const list = useRef(undefined)

  const bind = useDrag(
    ({ first, memo: threshold, active, movement: [dx] }) => {
      if (first) {
        const lastItemRect = lastItem.current.getBoundingClientRect()
        const listRect = list.current.getBoundingClientRect()
        // how much can we drag in one single drag session
        threshold = {
          max: -offset.current,
          min: listRect.right - lastItemRect.right
        }
      }
      const x =
        offset.current + Math.min(threshold.max, Math.max(threshold.min, dx))
      animation.start({ x, immediate: (key) => key === 'x' })
      if (!active) offset.current = x
      return threshold
    },
    { axis: 'x' }
  )

  return (
    <div style={{ overflow: 'hidden' }} ref={list}>
      <animated.ul
        {...bind()}
        style={spring}
        className={clsx(styles.ul, styles.tabletUl)}
      >
        {courses.map((item, index) => (
          <li
            className={clsx(styles.li, styles.tabletLi)}
            key={item.id}
            ref={index === courses.length - 1 ? lastItem : undefined}
          >
            <CourseCard course={item} />
          </li>
        ))}
      </animated.ul>
    </div>
  )
}

export function MobileList({ courses = [] }) {
  const styles = useStyles(courses)

  const [spring, animation] = useSpring(() => ({
    x: 0
  }))

  const [active, setActive] = useState(0)

  useEffect(() => {
    const timeout = setInterval(
      () => setActive((active + 1) % courses.length),
      5000
    )
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    animation.start({ x: -active * widths.xs })
  }, [active])

  return (
    <div>
      <div
        style={{
          overflow: 'hidden',
          width: widths.xs,
          position: 'relative',
          left: '50%',
          transform: 'translate(-50%)'
        }}
      >
        <animated.ul className={styles.ul} style={spring}>
          {courses.map((item) => (
            <li className={styles.li} key={item.id}>
              <CourseCard course={item} />
            </li>
          ))}
        </animated.ul>
      </div>
      <MobileStepper
        variant="dots"
        steps={courses.length}
        position="static"
        activeStep={active}
        nextButton={
          <Button
            size="small"
            onClick={() => setActive(active + 1)}
            disabled={active >= courses.length - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => setActive(active - 1)}
            disabled={active <= 0}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </div>
  )
}
CourseList.propTypes = {
  courses: PropTypes.array.isRequired
}

MobileList.propTypes = CourseList.propTypes
