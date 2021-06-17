import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
  Grid,
  Button
} from '@material-ui/core'
import useStyles from './info.style'
import { currency } from '@/utils/intl'
import { Rating } from '@material-ui/lab'
import {
  Shop,
  Create,
  RateReview,
  Favorite,
  FavoriteBorder,
  Update,
  LocalOffer
} from '@material-ui/icons'
import { useCreateCourse } from './create-course.context'

const formatter = new Intl.NumberFormat()
const date = new Intl.DateTimeFormat()
export default function UpdateInfo() {
  const styles = useStyles()
  const { course, update } = useCreateCourse()

  const [title, setTitle] = useState(course.title)
  const [rating, setRating] = useState(0)
  const [price, setPrice] = useState(course.price)
  const [discount, setDiscount] = useState(course.discount)
  const [favorited, setFavorited] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [editPrice, setEditPrice] = useState(false)

  return (
    <Box>
      {editTitle ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              onFocus={(e) => e.target.select()}
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.textfield}
              onKeyPress={(e) => {
                if (e.code === 'Enter') e.target.blur()
              }}
            />
          </Grid>
          <Grid item xs={12} container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  update({ title })
                  setEditTitle(false)
                }}
              >
                Done
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setTitle(course.title)
                  setEditTitle(false)
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Box display="flex" alignItems="center">
          <Typography variant="h5" className={styles.title}>
            <b>{title || 'Enter the title of your course...'}</b>
          </Typography>
          <Tooltip title="Change title" placement="right">
            <IconButton
              onClick={() => setEditTitle(true)}
              className={styles.edit}
            >
              <Create />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box marginTop={1} />
      <ListItem disableGutters>
        <ListItemIcon classes={{ root: styles.rating_icon }}>
          <RateReview />
        </ListItemIcon>
        <ListItemText>
          <Box display="flex" alignItems="flex-end">
            <Typography className={styles.rating_text}>{rating}</Typography>
            <Box paddingX={0.25} />
            <Rating
              name="course-rating"
              value={rating}
              precision={0.5}
              size="medium"
              onChange={(e, value) => setRating(value)}
              className={styles.star}
            />
            <Box paddingX={0.25} />
            <Typography variant="subtitle2">(xxxxxxx)</Typography>
          </Box>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon classes={{ root: styles.rating_icon }}>
          <Shop />
        </ListItemIcon>
        <ListItemText>
          <Typography>
            <b>xxxxxxx</b> people bought this course
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon classes={{ root: styles.rating_icon }}>
          <Update />
        </ListItemIcon>
        <ListItemText>
          <Typography>
            Last modified <b>{date.format(Date.now())}</b>
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon classes={{ root: styles.rating_icon }}>
          <LocalOffer />
        </ListItemIcon>
        <ListItemText>
          {editPrice ? (
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.code === 'Enter') e.target.blur()
                  }}
                  type="text"
                  name="course-price"
                  value={formatter.format(price)}
                  onChange={(e) => {
                    const number = Number(e.target.value.replace(/[.,-]/, ''))
                    const s = formatter.format(number)
                    if (s !== 'NaN') setPrice(number)
                  }}
                  label="Price"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  onKeyPress={(e) => {
                    if (e.code === 'Enter') e.target.blur()
                  }}
                  type="number"
                  name="course-discount"
                  value={discount}
                  onChange={(e) => {
                    e.target.value = Math.min(
                      100,
                      Math.max(0, e.target.valueAsNumber)
                    )
                    setDiscount(e.target.valueAsNumber)
                  }}
                  label="Discount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      update({ price, discount: discount / 100 })
                      setEditPrice(false)
                    }}
                  >
                    Done
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      setPrice(course.price)
                      setDiscount(course.discount * 100)
                      setEditPrice(false)
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="flex-end">
                <Typography variant="h5">
                  <b>{currency(price - (price * discount) / 100)}</b>
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
                      <i>-{discount}%</i>
                    </Typography>
                  </>
                )}
              </Box>
              <IconButton
                className={styles.favorite}
                onClick={() => setFavorited((prev) => !prev)}
              >
                {favorited ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <Tooltip title="Change price" placement="right">
                <IconButton
                  onClick={() => setEditPrice(true)}
                  className={styles.edit}
                >
                  <Create />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </ListItemText>
      </ListItem>
    </Box>
  )
}
