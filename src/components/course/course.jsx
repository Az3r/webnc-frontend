import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Paper, Typography } from '@material-ui/core'
import { currency } from '@/utils/intl'
import useStyles from './course.style'
import { Rating } from '@material-ui/lab'

export const COURSE_WIDTH = 320
export const COURSE_RATIO = 16 / 9

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

  function Category({ category }) {
    let src = ''
    switch (category) {
      case 'mobile':
        src = 'images/category_mobile.webp'
        break
      case 'web':
        src = 'images/category_web.webp'
        break
      default:
        throw new Error('unknown category ' + category)
    }
    return <Avatar src={src} className={styles.category} />
  }

  function Thumbnail() {
    return (
      <Box flexShrink={0} position="relative" height={120} overflow="hidden">
        <img src={thumbnail} alt={title} className={styles.thumbnail} />
        <Category category={category} />
      </Box>
    )
  }

  function Title() {
    return <Typography className={styles.title}>{title}</Typography>
  }

  function Lecturer() {
    return (
      <Typography variant="subtitle2" className={styles.lecturer}>
        {lecturer.name}
      </Typography>
    )
  }

  function CourseRating() {
    return (
      <Box display="flex" color="text.secondary">
        <Rating value={rating} size="small" readOnly precision={0.5} />
        <Box paddingX={0.5} />
        <Typography variant="subtitle2">
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
    )
  }

  return (
    <Paper elevation={3}>
      <Box width={COURSE_WIDTH} display="flex" flexDirection="column">
        <Thumbnail />
        <Box display="flex" padding={1} flexGrow={1}>
          <Avatar src={lecturer.avatar} />
          <Box
            paddingLeft={1}
            flexGrow={1}
            display="flex"
            flexDirection="column"
          >
            <Title />
            <Lecturer />
            <CourseRating />
            <Price />
          </Box>
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
