import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Paper, Tooltip, Typography } from '@material-ui/core'
import { Star, StarHalf, StarOutline } from '@material-ui/icons'
import { currency } from '@/utils/intl'
import { stars } from '@/utils/course'
import styles from './course.module.css'

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
  function Thumbnail() {
    return (
      <div
        style={{
          flexShrink: '0',
          position: 'relative',
          height: '40%',
          overflow: 'hidden'
        }}
      >
        <img
          src={thumbnail}
          width="100%"
          alt={title}
          style={{
            maxWidth: '100%',
            borderRadius: '4px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '4px'
          }}
        >
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
        </div>
      </div>
    )
  }

  function Title() {
    return (
      <Typography
        variant="subtitle1"
        style={{ fontWeight: '600' }}
        className={styles.title}
      >
        {title}
      </Typography>
    )
  }

  function Lecturer() {
    return (
      <Typography variant="subtitle2" className={styles.lecturer}>
        {lecturer.name}
      </Typography>
    )
  }

  function Rating() {
    return (
      <div style={{ display: 'flex' }}>
        <Tooltip title={rating} placement="bottom" arrow>
          <div>
            {stars(rating).map((value, index) => {
              if (value === 1)
                return (
                  <Star fontSize="small" key={index} className={styles.star} />
                )
              if (value === -1)
                return (
                  <StarOutline
                    fontSize="small"
                    key={index}
                    className={styles.star}
                  />
                )
              if (value === 0)
                return (
                  <StarHalf
                    fontSize="small"
                    key={index}
                    className={styles.star}
                  />
                )
            })}
          </div>
        </Tooltip>
        <Box paddingLeft={1}>
          <Typography>({reviewers})</Typography>
        </Box>
      </div>
    )
  }

  function Price() {
    return (
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'flex-end'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography variant="h6">
            {currency(price * (1 - discount))}
          </Typography>
          {discount > 0 && (
            <>
              <Box paddingLeft={1}>
                <Typography
                  variant="subtitle2"
                  style={{ textDecoration: 'line-through' }}
                >
                  {currency(price)}
                </Typography>
              </Box>
              <Box paddingLeft={0.5} color="red">
                <Typography>(-{Math.round(discount * 100)}%)</Typography>
              </Box>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <Paper
      elevation={3}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Thumbnail />
      <Box display="flex" padding={1} flexGrow={1}>
        <Avatar src={lecturer.avatar} />
        <Box paddingLeft={1} flexGrow={1} display="flex" flexDirection="column">
          <Title />
          <Lecturer />
          <Rating />
          <Price />
        </Box>
      </Box>
    </Paper>
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
