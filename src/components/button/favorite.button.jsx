import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import clsx from 'clsx'

function FavoriteButton({ value, ...props }, ref) {
  const { classes, className, ...other } = props

  return (
    <IconButton className={clsx(classes.root, className)} {...other} ref={ref}>
      {value ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  )
}

export default withStyles({
  root: {
    color: '#e040fb',
    ['&:hover']: {
      color: '#cb2fe3'
    }
  }
})(React.forwardRef(FavoriteButton))

FavoriteButton.propTypes = {
  value: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
}
