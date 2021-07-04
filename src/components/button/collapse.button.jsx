import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, makeStyles } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  rotate: {
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut
    })
  },
  collapse: {
    transform: 'rotate(540deg)'
  }
}))

export default function CollapseButton({ collapse, className, ...props }) {
  const styles = useStyles()
  return (
    <IconButton
      className={clsx(
        styles.rotate,
        { [styles.collapse]: collapse },
        className
      )}
      {...props}
    >
      <KeyboardArrowDown />
    </IconButton>
  )
}

CollapseButton.propTypes = {
  collapse: PropTypes.bool,
  className: PropTypes.string
}
