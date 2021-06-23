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
import NextLink from '../nextlink'
import { routes } from '@/utils/app'
import { CoursePropTypes } from '@/utils/typing'

export default function Course({ course }) {
  const {
    id,
    category,
    topic,
    thumbnail,
    title,
    lecturer,
    rating,
    reviewers,
    price,
    discount
  } = course
  const styles = useStyles()

  function CourseRating() {
    return (
      <Box display="flex" color="text.secondary" alignItems="center">
        <Rating value={rating} size="small" readOnly precision={0.5} />
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
    <Card className={styles.card}>
      <CardMedia image={thumbnail} className={styles.thumbnail} title={title} />
      <CardHeader
        avatar={<Avatar src={lecturer.avatar} />}
        title={
          <NextLink color="inherit" href={routes.course(id)}>
            <Typography>{title}</Typography>
          </NextLink>
        }
        subheader={lecturer.name}
        classes={{ title: styles.title, subheader: styles.lecturer }}
      />
      <CardContent>
        <CourseRating />
        <Price />
      </CardContent>
    </Card>
  )
}

Course.propTypes = {
  course: CoursePropTypes.isRequired
}
