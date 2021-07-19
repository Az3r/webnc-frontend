import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ListItem,
  makeStyles,
  ListItemText,
  Box,
  Typography,
  Tooltip,
  Checkbox,
  Button,
  IconButton
} from '@material-ui/core'
import { Delete, Reorder, VideoCall } from '@material-ui/icons'
import { formatDuration } from '@/utils/tools'
import { animated, useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import CreateLectureDialog, { EditLectureDialog } from '../lecture.dialog'
import { useCreateCourse } from '.'
import { LecturePropTypes } from '@/utils/typing'

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
  useCreateCourse()

  const orders = useRef(lectures.map((_, index) => index))
  const [createDialog, setCreateDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(undefined)

  const [springs, animation] = useSprings(
    lectures.length,
    animate(orders.current)
  )

  function debounce() {
    return (duration, index) => {
      this.items.push(index)
      clearTimeout(this.timer)
      this.timer = setTimeout(
        () =>
          setLectures((prev) => {
            const array = prev.slice()
            this.items.forEach((i) => {
              array[i] = undefined
            })
            return array
          }),
        duration
      )
    }
  }
  const removeLectures = debounce.bind({ timer: undefined, items: [] })()

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
    let newOrders = orders.current
    if (orders.current[newRow]) {
      newOrders = move(orders.current, row, newRow)
      if (!active) orders.current = newOrders
    }

    // start animation
    animation.start(animate(newOrders, active, origin, row, y))
  })

  function onAddLecture(lecture) {
    orders.current.push(undefined)
    const insertedRow = orders.current.indexOf(undefined)
    orders.current[insertedRow] = orders.current.length - 1
    setLectures((prev) => [...prev, lecture])
  }

  function onEditLecture(lecture, index) {
    setLectures((prev) => [
      ...prev.slice(0, index),
      lecture,
      ...prev.slice(index + 1)
    ])
  }

  function onDeleteLecture(index) {
    const removedRow = orders.current.indexOf(index)
    orders.current.forEach((origin, row) => {
      if (row > removedRow) orders.current[row - 1] = origin
    })
    orders.current[orders.current.length - 1] = undefined
    animation.start(
      animate(orders.current, undefined, undefined, undefined, undefined, () =>
        removeLectures(600, index)
      )
    )
  }

  const length = lectures.reduce((prev, current) => prev + (current ? 1 : 0), 0)
  return (
    <Container fixed className={styles.root}>
      <Box display="flex" alignItems="center">
        <Typography>Total Lectures: {length}</Typography>
        <Box marginLeft="auto">
          <Button color="primary" onClick={() => setCreateDialog(true)}>
            Add Lecture
          </Button>
        </Box>
      </Box>
      <ul className={styles.ul} style={{ height: length * ITEM_HEIGHT }}>
        {springs.map(({ x, shadow, zIndex, opacity, y, scale }, index) => (
          <>
            {lectures[index] && (
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
                <LectureItem
                  lecture={lectures[index]}
                  onClick={() =>
                    setEditDialog({ lecture: lectures[index], index })
                  }
                  onPreviewChange={(checked) =>
                    setLectures((prev) => [
                      ...prev.slice(0, index),
                      {
                        ...prev[index],
                        preview: checked
                      },
                      ...prev.slice(index + 1)
                    ])
                  }
                />
                <Tooltip title="Remove Lecture">
                  <IconButton
                    className={styles.remove}
                    onClick={() => onDeleteLecture(index)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </animated.li>
            )}
          </>
        ))}
      </ul>
      <CreateLectureDialog
        maxWidth="sm"
        open={createDialog}
        onClose={() => setCreateDialog(false)}
        onConfirm={onAddLecture}
      />
      <EditLectureDialog
        maxWidth="sm"
        lecture={editDialog?.lecture}
        index={editDialog?.index}
        onClose={() => setEditDialog(undefined)}
        onConfirm={onEditLecture}
      />
    </Container>
  )
}

function LectureItem({ lecture, onPreviewChange, onClick }) {
  const styles = useStyles()
  const { title, preview, duration, url } = lecture
  const [checked, setChecked] = useState(preview)

  return (
    <>
      <Tooltip title={checked ? 'Disable preview' : 'Enable preview'}>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked)
            onPreviewChange?.(e.target.checked)
          }}
          checkedIcon={<VideoCall className={styles.preview} />}
          icon={<VideoCall color="action" />}
        />
      </Tooltip>
      <Tooltip title="Edit Lecture">
        <ListItem component="div" button onClick={onClick}>
          <ListItemText
            primaryTypographyProps={{ className: styles.text }}
            secondaryTypographyProps={{ className: styles.text }}
            primary={title}
            secondary={url}
          />
          <Typography>{formatDuration(duration)}</Typography>
        </ListItem>
      </Tooltip>
    </>
  )
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
function animate(orders, active, origin, row, y, onLeave) {
  return (index) => {
    if (orders.indexOf(index) === -1)
      return {
        opacity: 0,
        x: 300,
        shadow: 0,
        immediate: false,
        onRest: onLeave
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

LectureItem.propTypes = {
  lecture: LecturePropTypes.isRequired,
  onPreviewChange: PropTypes.func,
  onClick: PropTypes.func
}
