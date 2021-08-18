import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, Button } from '@material-ui/core'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'
import clsx from 'clsx'
import useStyles from './paragraph.style'

export default function LongParagraph({ children = <></>, line }) {
  const styles = useStyles({ line })
  const [more, expand] = useState(false)
  const [show, setShow] = useState(false)
  const paragraph = useRef(null)
  const checker = useRef(null)

  useEffect(() => {
    setShow(paragraph.current?.offsetHeight < checker.current?.offsetHeight)
  }, [line, children])

  useEffect(() => {
    function resize() {
      setShow(paragraph.current?.offsetHeight < checker.current?.offsetHeight)
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <Box position="relative">
      <Typography innerRef={checker} className={styles.checker}>
        {children}
      </Typography>
      <Typography
        innerRef={paragraph}
        className={clsx(styles.text, {
          [styles.expand]: more
        })}
      >
        {children}
      </Typography>
      <Box
        width="100%"
        display="flex"
        flexDirection="row-reverse"
        visibility={show ? 'visible' : 'hidden'}
      >
        <Button
          size="small"
          className={styles.button}
          variant="text"
          onClick={() => expand((prev) => !prev)}
          endIcon={more ? <ArrowUpward /> : <ArrowDownward />}
        >
          {more ? 'Shrink' : 'Expand'}
        </Button>
      </Box>
    </Box>
  )
}
LongParagraph.propTypes = {
  children: PropTypes.node,
  line: PropTypes.number
}

LongParagraph.defaultProps = {
  children: <></>,
  line: 3
}
