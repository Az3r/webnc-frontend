import React, { useState, useRef } from 'react'
import {
  Box,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  Dialog
} from '@material-ui/core'
import { AddCircle, Create, Delete, Reorder } from '@material-ui/icons'
import useStyles from './content.style'
import { useDrag } from 'react-use-gesture'
import { animated, useSprings } from 'react-spring'
import LectureItem from './lecture.component'
import LectureDialog from './create-lecture.dialog'
import { useCreateCourse } from './create-course.context'

export default function CourseContent() {
  const classes = useStyles()
  const { course, update } = useCreateCourse()
  const { lectures } = course

  // edit lecture
  const [dialog, show] = useState(false)
  const editting = useRef(null)

  // track items' height
  const item = useRef(null)

  // track initial index of dragged item at the start of drag
  const beginIndex = useRef(null)

  // store current order
  const orders = useRef(lectures.map((_, i) => i))

  const [springs, api] = useSprings(
    lectures.length,
    () => ({
      y: 0,
      opacity: 1,
      scale: 1,
      zIndex: 0,
      immediate: false
    }),
    [course]
  )

  const bind = useDrag(({ args: [origin], active, movement: [, y] }) => {
    const currentIndex = orders.current.indexOf(origin)
    if (beginIndex.current === null) beginIndex.current = currentIndex
    const currentRow = clamp(
      Math.round(
        (y + beginIndex.current * item.current.offsetHeight) /
          item.current.offsetHeight
      ),
      0,
      lectures.length - 1
    )
    swap(orders.current, currentIndex, currentRow)
    api.start(
      animate({
        orders: orders.current,
        item: item.current,
        current: beginIndex.current,
        active,
        y,
        origin
      })
    )
    if (!active) {
      beginIndex.current = null
    }
  })

  return (
    <div>
      <Box display="flex" alignItems="center" color="info.main">
        <Typography color="textPrimary" className={classes.header}>
          This Course Contains
        </Typography>
        <Tooltip title="Add new lecture" placement="right">
          <IconButton
            color="inherit"
            onClick={() => {
              editting.current = null
              show(true)
            }}
          >
            <AddCircle />
          </IconButton>
        </Tooltip>
      </Box>
      <ul>
        {springs.map((styles, i) => (
          <animated.div
            className={classes.item}
            key={lectures[i].title}
            ref={i === 0 ? item : undefined}
            style={styles}
          >
            <IconButton disableRipple disableTouchRipple {...bind(i)}>
              <Reorder />
            </IconButton>
            <Box flexGrow={1}>
              <Paper>
                <LectureItem lecture={lectures[i]} />
              </Paper>
            </Box>
            <Box display="flex" flexDirection="column">
              <IconButton
                onClick={() => {
                  editting.current = { item: lectures[i], index: i }
                  show(true)
                }}
              >
                <Create />
              </IconButton>
              <IconButton
                onClick={() => {
                  lectures.splice(i, 1)
                  update({ lectures })
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </animated.div>
        ))}
      </ul>
      <Dialog open={dialog} maxWidth="md" fullWidth onClose={() => show(false)}>
        <LectureDialog
          lecture={editting.current?.item}
          onDone={(lecture) => {
            if (editting.current) lectures[editting.current.index] = lecture
            else {
              orders.current.push(orders.current.length)
              lectures.push(lecture)
            }
            update({ lectures })
            show(false)
          }}
          onCancel={() => show(false)}
        />
      </Dialog>
    </div>
  )
}

function animate({ orders, item, active, origin, current, y }) {
  return function (index) {
    return active && index === origin
      ? {
          y: y + (current - index) * item.offsetHeight,
          scale: 1.05,
          zIndex: 10,
          immediate: (n) => n === 'y' || n === 'zIndex'
        }
      : {
          y: (orders.indexOf(index) - index) * item.offsetHeight,
          scale: 1,
          zIndex: 0,
          immediate: false
        }
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function swap(array, x, y) {
  const temp = array[x]
  array[x] = array[y]
  array[y] = temp
}
