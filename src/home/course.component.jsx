import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@material-ui/core'
import { Star, StarHaf, StarHalf, StarOutline } from '@material-ui/icons'
import useStyles from './course.style'
import LinesEllipsis from 'react-lines-ellipsis'

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
  const styles = useStyles()

  // calculate star rating
  const stars = []
  const ceil = Math.ceil(rating)
  for (let i = 0; i < rating; i++) {
    stars.push(Star)
  }
  for (let i = rating; i < 5; i++) {
    stars.push(StarOutline)
  }
  if (ceil - rating <= 0.5) stars[ceil - 1] = StarHalf

  return (
    <Box width="400px" height="300px">
      <img src={thumbnail} height="150px" width="400px" />
      <Box display="flex">
        <Avatar src={lecturer.avatar} />
        <Box paddingLeft={2}>
          <Typography variant="h5">
            <LinesEllipsis maxLine={2} trimRight text={title} />
          </Typography>
          <Box display="flex">
            <Typography variant="subtitle1">{lecturer.name}</Typography>
            <Box paddingLeft={1} paddingRight={1}>
              <Typography variant="subtitle1">-</Typography>
            </Box>
            {stars.map((Item, index) => (
              <Item key={index} className={styles.star} />
            ))}
            <Box paddingLeft={0.1}>
              <Typography variant="subtitle1">({reviewers})</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

Course.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  lecturer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }),
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
