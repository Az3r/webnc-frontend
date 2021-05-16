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
    <Box width="350px" height="300px">
      <Box position="relative">
        <img
          src={thumbnail}
          height="150px"
          width="350px"
          style={{
            borderRadius: '4px'
          }}
        />
        <Box position="absolute" bottom="4px" right="4px">
          {category === 'mobile' && (
            <img
              src="images/category_mobile.webp"
              width="36px"
              height="36px"
              style={{ borderRadius: '50%' }}
            />
          )}
          {category === 'web' && (
            <img
              src="images/category_web.webp"
              width="36px"
              height="36px"
              style={{ borderRadius: '50%' }}
            />
          )}
        </Box>
      </Box>
      <Box display="flex">
        <Box>
          <Avatar src={lecturer.avatar} />
        </Box>
        <Box paddingLeft={2}>
          <Typography variant="h6">
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
          <Box display="flex" alignItems="baseline">
            <Typography variant="h5">
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
