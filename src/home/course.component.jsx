import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Paper, Tooltip, Typography } from '@material-ui/core'
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
    <Paper
      elevation={3}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{ position: 'relative', height: '120px', overflow: 'hidden' }}
      >
        <img
          src={thumbnail}
          width="100%"
          alt={title}
          style={{
            maxWidth: '100%',
            height: 'auto',
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
      <Box display="flex" padding={1} flexGrow={1}>
        <Avatar src={lecturer.avatar} />
        <Box paddingLeft={1} flexGrow={1} display="flex" flexDirection="column">
          <Typography variant="subtitle1" style={{ fontWeight: '600' }}>
            <LinesEllipsis maxLine={2} trimRight text={title} />
          </Typography>
          <Box color="rgb(0,0,0,0.5)" alignItems="center">
            <Typography variant="subtitle2">
              <LinesEllipsis trimRight text={lecturer.name} />
            </Typography>
            <Box display="flex" alignItems="center">
              <Tooltip title={rating} placement="bottom" arrow>
                <Box>
                  {stars(rating).map((value, index) => {
                    if (value === 1)
                      return (
                        <Star
                          fontSize="small"
                          key={index}
                          className={styles.star}
                        />
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
                </Box>
              </Tooltip>
              <Box padding={1}>
                <Typography>({reviewers})</Typography>
              </Box>
            </Box>
          </Box>
          <div
            style={{
              display: 'flex',
              flexGrow: '1',
              flexDirection: 'column'
            }}
          >
            <div style={{ flexGrow: '1' }} />
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
