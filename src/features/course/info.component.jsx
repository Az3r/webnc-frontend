import React, { useState, useEffect } from 'react'
import {
  Tooltip,
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core'
import useStyles from './info.style'
import { currency, date } from '@/utils/tools'
import { Rating } from '@material-ui/lab'
import {
  Shop,
  RateReview,
  Favorite,
  FavoriteBorder,
  Update,
  LocalOffer
} from '@material-ui/icons'
import LongParagraph from '@/components/paragraph'
import { CourseDetailPropTypes } from '@/utils/typing'
import { useAuth } from '@/components/hooks/auth.provider'
import { fetchPOST, resources, useGET } from '@/utils/api'
import { useRouter } from 'next/router'
import { routes, withAuthenticated } from '@/utils/app'
import { useSnackbar } from 'notistack'
import { mutate } from 'swr'

export default function CourseInfo({ course }) {
  const styles = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const {
    id,
    title,
    rating,
    reviewers,
    bought,
    lastModified,
    price,
    discount,
    shortdesc
  } = course

  const { user } = useAuth()
  const { data: library = [] } = useGET(() =>
    user ? resources.library.get(user.id) : undefined
  )
  const { data: watchlist = [] } = useGET(() =>
    user ? resources.watchlist.get(user.id) : undefined
  )

  const [processing, setProcessing] = useState(false)
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
      action: async () => {
        setProcessing(true)
        try {
          await fetchPOST(resources.shop.post, {
            studentId: user.id,
            courseId: id
          })
          enqueueSnackbar('Added to Cart', { variant: 'info' })
          router.push(routes.u.shop)
        } catch (error) {
          enqueueSnackbar(error.message, { variant: 'error' })
        } finally {
          setTimeout(() => {
            mutate(resources.shop.get(user.id))
            setProcessing(false)
          }, 2000)
        }
      }
    })
  }

  function watchCourse() {
    router.push(routes.u.watch(id))
  }

  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <Box marginTop={1} />
      <ListItem disableGutters>
        <ListItemIcon>
          <RateReview />
        </ListItemIcon>
        <ListItemText>
          <Box display="flex" alignItems="flex-end">
            <Typography>{rating}</Typography>
            <Box paddingX={0.25} />
            <Rating
              name="course-rating"
              readOnly
              value={rating}
              precision={0.5}
              size="medium"
            />
            <Box paddingX={0.25} />
            <Typography variant="subtitle2">({reviewers} ratings)</Typography>
          </Box>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon>
          <Shop />
        </ListItemIcon>
        <ListItemText>
          <Typography>
            <b>{bought}</b> people bought this course
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon>
          <Update />
        </ListItemIcon>
        <ListItemText>
          <Typography>
            Last modified <b>{date(lastModified)}</b>
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon>
          <LocalOffer />
        </ListItemIcon>
        <ListItemText>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="flex-end">
              <Typography variant="h5">
                <b>{currency(price - price * discount)}</b>
              </Typography>
              {discount > 0 && (
                <>
                  <Box paddingX={0.5} />
                  <Typography
                    variant="subtitle1"
                    className={styles.strikethrough}
                  >
                    <i>{currency(price)}</i>
                  </Typography>
                  <Box paddingX={0.5} />
                  <Typography variant="h5" className={styles.red}>
                    <i>-{Math.round(discount * 100)}%</i>
                  </Typography>
                </>
              )}
            </Box>
            <Tooltip
              title={watchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <IconButton
                className={styles.favorite}
                onClick={() => onWatchlistChange(!watchlisted)}
              >
                {watchlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <LongParagraph line={5}>{shortdesc}</LongParagraph>
      </ListItem>
      <Button
        fullWidth
        disabled={processing}
        variant="contained"
        color={inUserLibrary ? 'secondary' : 'primary'}
        onClick={inUserLibrary ? watchCourse : addToCart}
      >
        {processing ? (
          <CircularProgress />
        ) : inUserLibrary ? (
          'Watch this course'
        ) : (
          'add to cart'
        )}
      </Button>
    </>
  )
}

CourseInfo.propTypes = CourseDetailPropTypes.isRequired
