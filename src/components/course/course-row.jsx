import React, { useEffect, useState } from 'react'
import { CoursePropTypes } from '@/utils/typing'
import {
  Tooltip,
  Box,
  Chip,
  Grid,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import useStyles from './course-row.style'
import {
  Flare,
  MonetizationOn,
  Shop,
  ShoppingCart,
  Star
} from '@material-ui/icons'
import clsx from 'clsx'
import { currency } from '@/utils/tools'
import NextLink from '../nextlink'
import NextImage from 'next/image'
import { routes } from '@/utils/app'
import { Skeleton } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import FavoriteButton from '../button/favorite.button'
import { useAuth } from '../hooks/auth.provider'
import { resources, useGET } from '@/utils/api'

export default function CourseRow({ course }) {
  const { id, tag, title, thumbnail, rating, bought, price, discount } = course
  const styles = useStyles()
  const theme = useTheme()
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))
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
          <Box position="absolute" top={0} left={0} right={0} bottom={0}>
            <NextImage
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
                <IconButton>
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
              alignItems="center"
            >
              <Typography color="inherit">{bought}</Typography>
              <Box paddingX={0.25} />
              <Shop color="action" />
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
              <FavoriteButton
                onClick={onWatchList}
                size={downSM ? 'small' : 'medium'}
                value={watchlisted}
              />
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
