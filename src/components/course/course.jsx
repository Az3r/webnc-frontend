import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@material-ui/core'
import { currency } from '@/utils/intl'
import useStyles from './course.style'
import { Rating } from '@material-ui/lab'

export default function Course({
  course: { thumbnail, title, lecturer, rating, reviewers, price, discount },
  disableContent
}) {
  const styles = useStyles()

  function CourseRating() {
    return (
      <Box display="flex" color="text.secondary" alignItems="center">
        <Rating value={rating} size="medium" readOnly precision={0.5} />
        <Box paddingX={0.5} />
        <Typography variant="subtitle1">
          ({rating} / {reviewers})
        </Typography>
      </Box>
    )
  }

  function Price() {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="h6">{currency(price * (1 - discount))}</Typography>
        {discount > 0 && (
          <>
            <Box paddingLeft={1} color="text.secondary">
              <Typography
                variant="caption"
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
    )
  }

  return (
    <Card className={styles.root}>
      <CardMedia
        image={thumbnail}
        className={styles.thumbnail}
        component="img"
      />
      <CardHeader
        avatar={<Avatar src={lecturer.avatar} />}
        title={title}
        subheader={lecturer.name}
        classes={{ title: styles.title, subheader: styles.lecturer }}
      />
      <CardContent classes={{ root: styles.content }}>
        <CourseRating />
        <Price />
      </CardContent>
    </Card>
  )
}

Course.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
