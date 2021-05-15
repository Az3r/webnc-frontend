import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

export default function Course({
  thumbnail,
  title,
  category,
  lecturer,
  rating,
  reviewers,
  price,
  discount
}) {
  return (
    <Box width="400px" height="300px">
      {title}
    </Box>
  )
}

Course.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  lecturer: PropTypes.string.isRequired,
  rating: PropTypes.number,
  reviewers: PropTypes.number,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number
}

Course.defaultProps = {
  rating: 0,
  reviewers: 0,
  discount: 0
}
