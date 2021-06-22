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
  AccessTime,
  Favorite,
  FavoriteBorder,
  Flare,
  MonetizationOn,
  Shop,
  Star
} from '@material-ui/icons'
import clsx from 'clsx'
import { currency, date } from '@/utils/intl'
import { useSnackBar } from '../snackbar.provider'

export default function CourseRow({ course }) {
  const { tag, title, thumbnail, rating, bought, price, discount } = course
  const styles = useStyles()
  const theme = useTheme()
  const { show } = useSnackBar()
  const downXS = useMediaQuery(theme.breakpoints.down('xs'))

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
    <Box display="flex" alignItems="center">
      <img src={thumbnail} width={80} height={80} />
      <Box paddingX={0.5} />
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={styles.title}>{title}</Typography>
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
                <em>-{discount * 100}%</em>
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} container spacing={1}>
          <Grid item sm={4}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              color="secondary.main"
              alignItems="center"
            >
              <Typography color="inherit">{bought}</Typography>
              <Box paddingX={0.25} />
              <Shop color="inherit" />
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box
              display="flex"
              color="warning.main"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Typography color="inherit">{rating}</Typography>
              <Box paddingX={0.25} />
              <Star color="inherit" />
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box display="flex" alignItems="center" width="100%" height="100%">
              <IconButton
                color="primary"
                onClick={onWatchList}
                size={downXS ? 'small' : 'medium'}
              >
                {watchlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

CourseRow.propTypes = {
  course: CoursePropTypes.isRequired
}
