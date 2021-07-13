import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core'
import NextImage from 'next/image'
import { currency } from '@/utils/tools'
import useStyles from './course-card.style'
import { Rating, Skeleton } from '@material-ui/lab'
import NextLink from '../nextlink'
import { routes } from '@/utils/app'
import { CourseLibraryPropTypes, CoursePropTypes } from '@/utils/typing'
import { PlayArrow, Shop, ShoppingCart, VideoLibrary } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import FavoriteButton from '../button/favorite.button'
import { useAuth } from '../hooks/auth.provider'
import { resources, useGET } from '@/utils/api'
import clsx from 'clsx'
import Link from 'next/link'
import LabelProgress from '@/components/progress/label-progress'

export default function CourseCard({ course }) {
  const {
    id,
    thumbnail,
    title,
    lecturer,
    rating,
    reviewers,
    price,
    discount,
    bought
  } = course
  const styles = useStyles()

  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAuth()
  const { data: library = [] } = useGET(() =>
    user ? resources.library.get(user.id) : undefined
  )
  const { data: watchlist = [] } = useGET(() =>
    user ? resources.watchlist.get(user.id) : undefined
  )
  const [watchlisted, setWatchlisted] = useState(false)
  const [inUserLibrary, setInUserLibrary] = useState(false)

  useEffect(() => {
    setInUserLibrary(library.includes(id))
  }, [library])
  useEffect(() => {
    setInUserLibrary(watchlist.includes(id))
  }, [watchlist])

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
          className={styles.thumbnail}
        />
        <Box position="absolute" top={0} right={0} zIndex={1}>
          <Tooltip
            title={watchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <FavoriteButton
              value={watchlisted}
              onClick={() => {
                enqueueSnackbar(
                  watchlisted ? 'Removed from Watchlist' : 'Added to Watchlist',
                  { variant: 'success' }
                )
                setWatchlisted((prev) => !prev)
              }}
            />
          </Tooltip>
        </Box>
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
        <Box display="flex" alignItems="center" color="text.secondary">
          <Shop fontSize="small" color="inherit" />
          <Box paddingX={0.5} />
          <Typography color="inherit" variant="subtitle1">
            {bought}
          </Typography>
        </Box>
        <CourseRating />
        <Price />
        <Box position="relative">
          <Box position="absolute" bottom={0} right={0}>
            {inUserLibrary ? (
              <Box color="info.light">
                <Tooltip title="In your library">
                  <VideoLibrary color="inherit" />
                </Tooltip>
              </Box>
            ) : (
              <Tooltip title="Add to Cart">
                <IconButton color="primary">
                  <ShoppingCart />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
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

export function CourseCardLibrary({ course }) {
  const styles = useStyles()
  const { thumbnail, title, lecturer, id, progress } = course
  const [hover, setHover] = useState(false)
  return (
    <Card>
      <Box
        height={0}
        paddingTop="56.25%"
        position="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <NextImage
          src={thumbnail}
          layout="fill"
          objectFit="cover"
          title={title}
          className={clsx(styles.transition, {
            [styles.thumbnailHover]: hover
          })}
        />
        <Link href={routes.u.watch(id)} passHref>
          <Box
            component="a"
            position="absolute"
            top={0}
            left={0}
            right={0}
            fontSize="4em"
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={1}
            color="white"
            className={clsx(styles.transition, styles.watch, {
              [styles.watchHover]: hover
            })}
          >
            <PlayArrow color="inherit" fontSize="inherit" />
          </Box>
        </Link>
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
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <LabelProgress value={progress} />
        </Box>
      </CardContent>
    </Card>
  )
}

CourseCardLibrary.propTypes = {
  course: CourseLibraryPropTypes.isRequired
}
