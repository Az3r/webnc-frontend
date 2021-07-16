import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ListItem,
  makeStyles,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Tooltip,
  Checkbox,
  Button,
  IconButton
} from '@material-ui/core'
import { Create, Delete, Reorder, VideoCall } from '@material-ui/icons'
import { formatDuration } from '@/utils/tools'
import { animated, useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import CreateLectureDialog from '../lecture.dialog'
import { useCreateCourse } from '.'

const ITEM_HEIGHT = 80
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1024
  },
  preview: {
    color: theme.palette.warning.main
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  ul: {
    position: 'relative',
    ['& > li']: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: ITEM_HEIGHT,
      padding: theme.spacing(1)
    }
  },
  reorder: {
    cursor: 'grab',
    ['&:active']: {
      cursor: 'grabbing'
    }
  },
  remove: {
    color: theme.palette.error.main
  }
}))

export default function LectureSection() {
  const styles = useStyles()
  const { lectures, setLectures } = useCreateCourse()

  const orders = useRef(lectures.map((_, index) => index))
  const [dialog, setDialog] = useState(false)

  const [springs, animation] = useSprings(
    lectures.length,
    animate(orders.current)
  )

  const bind = useDrag(({ args: [origin], active, movement: [, y] }) => {
    // find the current row of an item
    const row = orders.current.indexOf(origin)

    // calculate current item's y position (css top)
    const position = Math.max(
      0,
      Math.min(row * ITEM_HEIGHT + y, lectures.length * ITEM_HEIGHT)
    )

    // get item's new row
    const newRow = Math.round(position / ITEM_HEIGHT)

    // move item to new position
    const newOrders = move(orders.current, row, newRow)
    if (!active) orders.current = newOrders

    // start animation
    animation.start(animate(newOrders, active, origin, row, y))
  })

  function onAddLecture(lecture) {
    orders.current.push(-1)
    const insertedRow = orders.current.indexOf(-1)
    orders.current[insertedRow] = lectures.length
    setLectures((prev) => [...prev, 'z'])
  }

  function onDeleteLecture(index) {
    const removedRow = orders.current.indexOf(index)
    orders.current.forEach((origin, row) => {
      if (row > removedRow) orders.current[row - 1] = origin
    })
    orders.current[orders.current.length - 1] = -1
    animation.start(animate(orders.current))
  }

  return (
    <Container fixed className={styles.root}>
      <Box display="flex" alignItems="center">
        <Typography>Total Lectures: {lectures.length}</Typography>
        <Box marginLeft="auto">
          <Button color="primary" onClick={onAddLecture}>
            Add Lecture
          </Button>
        </Box>
      </Box>
      <ul
        className={styles.ul}
        style={{ height: lectures.length * ITEM_HEIGHT }}
      >
        {springs.map(({ x, shadow, zIndex, opacity, y, scale }, index) => (
          <animated.li
            key={lectures[index].title}
            style={{
              zIndex,
              y,
              x,
              opacity,
              scale,
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.2) 0px ${s}px ${s}px 0px`
              )
            }}
            component="li"
          >
            <Reorder
              {...bind(index)}
              color="action"
              className={styles.reorder}
            />
            <Box width={320}>
              <Typography align="center" variant="h4">
                {lectures[index]}
              </Typography>
            </Box>
            <Tooltip title="Remove Lecture">
              <IconButton
                className={styles.remove}
                onClick={() => onDeleteLecture(index)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </animated.li>
        ))}
      </ul>
      <CreateLectureDialog
        maxWidth="sm"
        fullWidth
        open={dialog}
        onClose={() => setDialog(false)}
        onConfirm={onAddLecture}
      />
    </Container>
  )
}

function LectureItem({ lecture }) {
  const styles = useStyles()
  const { title, preview, desc, duration } = lecture
  const [checked, setChecked] = useState(preview)

  return (
    <ListItem component="div">
      <ListItemIcon>
        <Tooltip title={checked ? 'Disable preview' : 'Enable preview'}>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            checkedIcon={<VideoCall className={styles.preview} />}
            icon={<VideoCall color="action" />}
          />
        </Tooltip>
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ className: styles.text }}
        secondaryTypographyProps={{ className: styles.text }}
        primary={title}
        secondary={desc}
      />
      <Box paddingY={1}>
        <Tooltip title="Edit Lecture">
          <IconButton>
            <Create />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography>{formatDuration(duration)}</Typography>
    </ListItem>
  )
}

LectureItem.propTypes = {
  lecture: PropTypes.shape({
    title: PropTypes.string.isRequired,
    preview: PropTypes.bool,
    desc: PropTypes.string,
    duration: PropTypes.number.isRequired
  }).isRequired
}

/**
 * Moves an array item from one position in an array to another. Note: This is a pure function so a new array will be returned, instead of altering the array argument.
 * @param {any[]} array Array in which to move an item
 * @param {number} from index of item to move
 * @param {number} to index to which moves item
 * @link https://github.com/granteagon/move/blob/master/src/index.js
 * @returns new array
 */
function move(array, from, to) {
  const item = array[from]
  const length = array.length
  const diff = from - to

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, to),
      item,
      ...array.slice(to, from),
      ...array.slice(from + 1, length)
    ]
  } else if (diff < 0) {
    // move right
    const targetIndex = to + 1
    return [
      ...array.slice(0, from),
      ...array.slice(from + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length)
    ]
  }
  return array
}

/**
 * Returns fitting styles for dragged/idle items
 * @param {number[]} orders items' current positions
 * @param {boolean} active whether item is being dragged or idle
 * @param {number} origin item's position in list
 * @param {number} row rendered position
 * @param {number} y y-axis drag value
 * @returns
 */
function animate(orders, active, origin, row, y) {
  return (index) => {
    if (orders.indexOf(index) === -1)
      return {
        opacity: 0,
        zIndex: -1,
        x: 300,
        shadow: 0,
        immediate: false
      }
    return active && index === origin
      ? {
          opacity: 1,
          x: 0,
          y: row * ITEM_HEIGHT + y,
          scale: 1.05,
          zIndex: 1,
          shadow: 5,
          immediate: (key) => key === 'y' || key === 'zIndex'
        }
      : {
          x: 0,
          opacity: 1,
          y: orders.indexOf(index) * ITEM_HEIGHT,
          scale: 1,
          zIndex: 0,
          shadow: 0,
          immediate: false
        }
  }
}
