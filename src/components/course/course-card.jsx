import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core'
import NextImage from 'next/image'
import { currency, formatDateDifference } from '@/utils/tools'
import useStyles from './course-card.style'
import { Rating, Skeleton } from '@material-ui/lab'
import NextLink from '../nextlink'
import { routes, withAuthenticated } from '@/utils/app'
import { CourseLibraryPropTypes, CoursePropTypes } from '@/utils/typing'
import {
  Flare,
  MonetizationOn,
  PlayArrow,
  Shop,
  ShoppingCart,
  VideoLibrary
} from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import FavoriteButton from '../button/favorite.button'
import { useAuth } from '../hooks/auth.provider'
import {
  fetchPOST,
  resources,
  useGET,
  useGetCourseProcesses
} from '@/utils/api'
import clsx from 'clsx'
import Link from 'next/link'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

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
    bought,
    tag
  } = course
  const styles = useStyles()

  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const { user } = useAuth()
  const { data: library = [] } = useGET(() =>
    user ? resources.library.get(user.id) : undefined
  )
  const { data: watchlist = [] } = useGET(() =>
    user ? resources.watchlist.get(user.id) : undefined
  )
  const [watchlisted, setWatchlisted] = useState(undefined)
  const [inUserLibrary, setInUserLibrary] = useState(undefined)

  useEffect(() => {
    const found = library.find((e) => e.courseId === id)
    setInUserLibrary(found)
  }, [library])

  useEffect(() => {
    const found = watchlist.find((e) => e.courseId === id)
    setWatchlisted(found)
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

  function onWatchlistChange(value) {
    return withAuthenticated({
      router,
      user,
      action: () => {
        const message = value ? 'Added to Watchlist' : 'Removed from Watchlist'
        enqueueSnackbar(message, {
          variant: 'info'
        })
        setWatchlisted(value)

        const fetcher = () =>
          value
            ? fetchPOST(resources.watchlist.post, {
                studentId: user.id,
                courseId: id
              })
            : fetchPOST(resources.watchlist.remove(watchlisted.id), undefined, {
                method: 'DELETE'
              })
        fetcher()
          .catch((e) => enqueueSnackbar(e.message, { variant: 'error' }))
          .finally(() => mutate(resources.watchlist.get(user.id)))
      }
    })
  }

  async function addToCart() {
    return withAuthenticated({
      user,
      router,
      action: () => {
        enqueueSnackbar('Added to Cart', { variant: 'info' })

        fetchPOST(resources.shop.post, {
          studentId: user.id,
          courseId: id
        })
          .catch((e) => enqueueSnackbar(e.message, { variant: 'error' }))
          .finally(() => mutate(resources.shop.get(user.id)))
      }
    })
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
        {tag && (
          <Box position="absolute" top={8} right={8} zIndex={1}>
            <Chip
              className={clsx({
                [styles.chip_bestseller]: tag === 'bestseller'
              })}
              color="secondary"
              icon={tag === 'bestseller' ? <MonetizationOn /> : <Flare />}
              size="small"
              label={tag}
            />
            <Box paddingX={0.5} />
          </Box>
        )}
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
          <Box
            position="absolute"
            bottom={0}
            right={0}
            display="flex"
            flexDirection="column"
            top="auto"
            alignItems="center"
          >
            <Tooltip
              title={watchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <FavoriteButton
                value={Boolean(watchlisted)}
                onClick={() => onWatchlistChange(!watchlisted)}
              />
            </Tooltip>
            {inUserLibrary ? (
              <Tooltip title="In your library">
                <VideoLibrary color="primary" />
              </Tooltip>
            ) : (
              <Tooltip title="Add to Cart">
                <IconButton color="primary" onClick={addToCart}>
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
  const router = useRouter()

  const { thumbnail, title, lecturer, id, lastModified, finished } = course
  const { user } = useAuth()
  const { data: courseProcess } = useGetCourseProcesses(user?.id, course.id)

  const [hover, setHover] = useState(false)

  function watchCourse() {
    router.push({
      pathname: routes.u.watch,
      query: { courseId: course.id, lectureId: courseProcess.lectureId }
    })
  }

  return (
    <Card>
      <Box
        height={0}
        paddingTop="56.25%"
        position="relative"
        onClick={watchCourse}
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
        <Box color={finished ? 'success.main' : 'info.main'}>
          <Typography>{finished ? 'Completed' : 'In progress'}</Typography>
        </Box>
        <Typography>
          Updated {formatDateDifference(new Date(lastModified))}
        </Typography>
        {courseProcess && (
          <Typography>
            Watched {formatDateDifference(new Date(courseProcess.lastWatched))}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

CourseCardLibrary.propTypes = {
  course: CourseLibraryPropTypes.isRequired
}
