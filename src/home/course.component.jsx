import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Tooltip, Typography } from '@material-ui/core'
import { Star, StarHalf, StarOutline } from '@material-ui/icons'
import useStyles from './course.style'
import LinesEllipsis from 'react-lines-ellipsis'
import { currency } from '@/utils/intl'
import { stars } from '@/utils/course'

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
  return (
    <Box width="400px" height="300px">
      <img
        src={thumbnail}
        height="150px"
        width="400px"
        style={{
          borderRadius: '4px',
          border: '1px solid #ddd',
          padding: '4px'
        }}
      />
      <Box display="flex">
        <Avatar src={lecturer.avatar} />
        <Box paddingLeft={2}>
          <Typography variant="h5">
            <LinesEllipsis maxLine={2} trimRight text={title} />
          </Typography>
          <Box display="flex" color="rgb(0,0,0,0.5)">
            <Typography variant="subtitle1">{lecturer.name}</Typography>
            <Box paddingLeft={1} paddingRight={1}>
              <Typography variant="subtitle1">-</Typography>
            </Box>
            <Tooltip title={rating} placement="bottom" arrow>
              <Box>
                {stars(rating).map((value, index) => {
                  if (value === 1)
                    return <Star key={index} className={styles.star} />
                  if (value === -1)
                    return <StarOutline key={index} className={styles.star} />
                  if (value === 0)
                    return <StarHalf key={index} className={styles.star} />
                })}
              </Box>
            </Tooltip>
            <Box paddingLeft={0.1}>
              <Typography variant="subtitle1">({reviewers})</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">
              {currency(price * (1 - discount))}
            </Typography>
            <Box paddingLeft={1}>
              <Typography
                variant="subtitle1"
                style={{ textDecoration: 'line-through' }}
              >
                {currency(price)}
              </Typography>
            </Box>
            <Box paddingLeft={0.5} color="red">
              <Typography variant="subtitle1">(-{discount * 100}%)</Typography>
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
  rating: PropTypes.string,
  reviewers: PropTypes.number,
  price: PropTypes.string.isRequired,
  discount: PropTypes.string
}

Course.defaultProps = {
  rating: 0,
  reviewers: 0,
  discount: 0
}
