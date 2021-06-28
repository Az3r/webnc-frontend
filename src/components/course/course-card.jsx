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
import NextImage from 'next/image'
import { currency } from '@/utils/intl'
import useStyles from './course-card.style'
import { Rating, Skeleton } from '@material-ui/lab'
import NextLink from '../nextlink'
import { routes } from '@/utils/app'
import { CoursePropTypes } from '@/utils/typing'

export default function CourseCard({ course }) {
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
    <Card>
      <Box height={0} paddingTop="56.25%" position="relative">
        <NextImage
          src={thumbnail}
          layout="fill"
          objectFit="cover"
          title={title}
        />
      </Box>
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

CourseCard.propTypes = {
  course: CoursePropTypes.isRequired
}

export function CourseCardSkeleton() {
  return (
    <Card>
      <Box height={0} paddingTop="56.25%" position="relative">
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </Box>
      </Box>
      <CardHeader
        avatar={
          <Skeleton variant="circle">
            <Avatar>.</Avatar>
          </Skeleton>
        }
        title={
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        }
        subheader={
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        }
      />
      <CardContent>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton width="100%">
          <Typography variant="h5">.</Typography>
        </Skeleton>
      </CardContent>
    </Card>
  )
}
