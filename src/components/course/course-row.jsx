import React from 'react'
import { CoursePropTypes } from '@/utils/typing'
import {
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
  Favorite,
  FavoriteBorder,
  Flare,
  MonetizationOn,
  Shop,
  Star
} from '@material-ui/icons'
import clsx from 'clsx'
import { currency } from '@/utils/intl'
import { useSnackBar } from '../snackbar.provider'
import NextLink from '../nextlink'
import { routes } from '@/utils/app'

export default function CourseRow({ course }) {
  const { id, tag, title, thumbnail, rating, bought, price, discount } = course
  const styles = useStyles()
  const theme = useTheme()
  const { show } = useSnackBar()
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))

  const [watchlisted, setWatchlisted] = React.useState(course.watchlisted)

  async function onWatchList() {
    // TODO: Add course to user watchlist
    setWatchlisted((prev) => !prev)
    show({
      message: !watchlisted
        ? 'Add course to Watchlist'
        : 'Remove course from Watchlist',
      severity: 'success'
    })
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4} sm={3} md={2}>
        <Box position="relative" height={0} paddingTop="56.25%">
          <img
            src={thumbnail}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </Box>
      </Grid>
      <Grid container item xs={8} sm={9} md={10} spacing={downSM ? 0 : 4}>
        <Grid item xs={12} md={6}>
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
          </Box>
        </Grid>
        <Grid item xs={12} md={6} container spacing={1}>
          <Grid item md={4}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              color="secondary.main"
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
