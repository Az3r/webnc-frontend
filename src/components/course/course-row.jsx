import React from 'react'
import { CoursePropTypes } from '@/utils/typing'
import {
  CircularProgress,
  Tooltip,
  Box,
  Chip,
  Grid,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button
} from '@material-ui/core'
import useStyles from './course-row.style'
import {
  Favorite,
  FavoriteBorder,
  Flare,
  MonetizationOn,
  Shop,
  ShoppingCart,
  Star
} from '@material-ui/icons'
import clsx from 'clsx'
import { currency } from '@/utils/intl'
import NextLink from '../nextlink'
import NextImage from 'next/image'
import { routes } from '@/utils/app'
import { Skeleton } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

export default function CourseRow({ course }) {
  const {
    id,
    tag,
    title,
    thumbnail,
    rating,
    bought,
    price,
    discount,
    inUserLibrary,
    userProgression
  } = course
  const styles = useStyles()
  const theme = useTheme()
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))
  const { enqueueSnackbar } = useSnackbar()

  const [watchlisted, setWatchlisted] = React.useState(course.watchlisted)

  async function onWatchList() {
    // TODO: Add course to user watchlist
    setWatchlisted((prev) => !prev)
    enqueueSnackbar(
      !watchlisted ? 'Add to Watchlist' : 'Remove from Watchlist',
      {
        variant: 'success'
      }
    )
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4} sm={3} md={2}>
        <Box position="relative" height={0} paddingTop="56.25%">
          {inUserLibrary && (
            <Box
              position="absolute"
              top={0}
              right={0}
              zIndex={1}
              display="inline-flex"
              color="success.dark"
            >
              <CircularProgress
                value={userProgression}
                variant="determinate"
                color="inherit"
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="inherit"
                >{`${Math.round(userProgression ?? 0)}%`}</Typography>
              </Box>
            </Box>
          )}
          <Box position="absolute" top={0} left={0} right={0} bottom={0}>
            <NextImage
              className={styles.thumbnail}
              src={thumbnail}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Box>
      </Grid>
      <Grid container item xs={8} sm={9} md={10} spacing={downSM ? 0 : 4}>
        <Grid item xs={12} md={6}>
          {inUserLibrary && (
            <Box color="info.main">
              <Typography>
                <i>In library</i>
              </Typography>
            </Box>
          )}
          <NextLink href={routes.course(id)} color="inherit">
            <Typography className={styles.title}>{title}</Typography>
          </NextLink>
          <Box display="flex" alignItems="center">
            {tag && (
              <>
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
              </>
            )}
            <Typography variant="h6">
              <b>{currency(price - price * discount)}</b>
            </Typography>
            <Box paddingX={0.25} />
            {discount > 0 && (
              <Typography color="error">
                <em>-{Math.round(discount * 100)}%</em>
              </Typography>
            )}
            {!inUserLibrary && (
              <Tooltip title="Add to Cart">
                <IconButton color="primary">
                  <ShoppingCart />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} container spacing={1}>
          <Grid item md={4}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              color="text.secondary"
              alignItems="center"
            >
              <Typography color="inherit">{bought}</Typography>
              <Box paddingX={0.25} />
              <Shop color="inherit" />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              display="flex"
              color="warning.main"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Typography color="inherit">{rating}</Typography>
              <Box paddingX={0.25} />
              <Star color="inherit" />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              height="100%"
              justifyContent="center"
            >
              <IconButton
                color="primary"
                onClick={onWatchList}
                size={downSM ? 'small' : 'medium'}
              >
                {watchlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

CourseRow.propTypes = {
  course: CoursePropTypes.isRequired
}

export function CourseRowSkeleton() {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4} sm={3} md={2}>
        <Box position="relative" height={0} paddingTop="56.25%">
          <Box position="absolute" top={0} left={0} right={0} bottom={0}>
            <Skeleton width="100%" height="100%" variant="rect" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton width="70%">
          <Typography variant="h6">.</Typography>
        </Skeleton>
        <Skeleton width="55%">
          <Typography>.</Typography>
        </Skeleton>
      </Grid>
    </Grid>
  )
}
