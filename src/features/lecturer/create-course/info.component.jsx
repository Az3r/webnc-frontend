import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Tooltip,
  Grid,
  Button,
  Dialog
} from '@material-ui/core'
import useStyles from './info.style'
import { currency, date } from '@/utils/tools'
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
import { useCreateCourse } from '.'
import LongParagraph from '@/components/paragraph'
import TitleDialog from './edit-title.dialog'
import PriceDialog from './edit-price.dialog'

export default function UpdateInfo() {
  const styles = useStyles()
  const { course, update } = useCreateCourse()
  const { price, discount } = course

  const [rating, setRating] = useState(0)
  const [shortdesc, setShortdesc] = useState(course.shortdesc)
  const [favorited, setFavorited] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [editPrice, setEditPrice] = useState(false)
  const [editShortdesc, setEditShortdesc] = useState(false)

  return (
    <div>
      <Box display="flex" alignItems="center">
        {course.title && (
          <Typography variant="h5" className={styles.title}>
            <b>{course.title}</b>
          </Typography>
        )}
        {!course.title && (
          <Typography variant="h5" color="textSecondary">
            <em>Enter the title of your course...</em>
          </Typography>
        )}
        <Tooltip title="Change title" placement="right">
          <IconButton
            onClick={() => setEditTitle(true)}
            className={styles.edit}
          >
            <Create />
          </IconButton>
        </Tooltip>
      </Box>
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
            Last modified <b>{date()}</b>
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        <ListItemIcon classes={{ root: styles.rating_icon }}>
          <LocalOffer />
        </ListItemIcon>
        <ListItemText>
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
            <EditButton
              tooltip="Change price"
              onClick={() => setEditPrice(true)}
            />
          </Box>
        </ListItemText>
      </ListItem>
      <ListItem disableGutters>
        {editShortdesc ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="course-shortdesc"
                variant="outlined"
                placeholder="Explain what this course is about, should be less then 5 lines..."
                rows={5}
                onChange={(e) => setShortdesc(e.target.value)}
                rowsMax={5}
                multiline
                fullWidth
              />
            </Grid>
            <EdittingGroup
              onDone={() => {
                update({ shortdesc })
                setEditShortdesc(false)
              }}
              onCancel={() => {
                setShortdesc(course.shortdesc)
                setEditShortdesc(false)
              }}
            />
          </Grid>
        ) : (
          <LongParagraph line={5}>
            {shortdesc ||
              'Explain what this course is about, should be less then 5 lines...'}
          </LongParagraph>
        )}
      </ListItem>
      <Button fullWidth variant="contained" color="primary" disabled>
        add to cart
      </Button>
      <Dialog open={editTitle} onClose={() => setEditTitle(false)}>
        <TitleDialog
          title={course.title}
          onDone={(text) => {
            update({ title: text })
            setEditTitle(false)
          }}
          onCancel={() => {
            setEditTitle(false)
          }}
        />
      </Dialog>
      <Dialog open={editPrice} onClose={() => setEditPrice(false)}>
        <PriceDialog
          price={course.price}
          discount={course.discount}
          onDone={({ price, discount }) => {
            update({ price, discount })
            setEditPrice(false)
          }}
          onCancel={() => {
            setEditPrice(false)
          }}
        />
      </Dialog>
    </div>
  )
}

function EditButton({ onClick, tooltip }) {
  const styles = useStyles()
  return (
    <Tooltip title={tooltip} placement="right">
      <IconButton onClick={onClick} className={styles.edit}>
        <Create />
      </IconButton>
    </Tooltip>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired
}

function EdittingGroup({ onDone, onCancel }) {
  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={onDone}>
          Done
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" color="primary" onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}

EdittingGroup.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}
