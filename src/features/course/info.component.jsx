import React, { useState } from 'react'
import {
  Tooltip,
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button
} from '@material-ui/core'
import useStyles from './info.style'
import { currency, date } from '@/utils/intl'
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

export default function CourseInfo({ course }) {
  const styles = useStyles()
  const {
    title,
    rating,
    reviewers,
    bought,
    lastModifed,
    price,
    discount,
    shortdesc
  } = course

  const [favorited, setFavorited] = useState(false)

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
            Last modified <b>{date(lastModifed)}</b>
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
              title={favorited ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <IconButton
                className={styles.favorite}
                onClick={() => setFavorited((prev) => !prev)}
              >
                {favorited ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <LongParagraph line={5}>{shortdesc}</LongParagraph>
      </ListItem>
      <Button fullWidth variant="contained" color="primary">
        add to cart
      </Button>
    </>
  )
}

CourseInfo.propTypes = CourseDetailPropTypes.isRequired
