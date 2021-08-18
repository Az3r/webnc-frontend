import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  TextField,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Box,
  InputAdornment
} from '@material-ui/core'
import { useGetCategoryV2 } from '@/utils/api'
import NextImage from 'next/image'
import { Star } from '@material-ui/icons'
import PriceTextField from '../inputs/price.input'

const useStyles = makeStyles((theme) => ({
  content: {
    ['& > *']: {
      margin: theme.spacing(1, 0)
    },
    ['& > *:first-child']: {
      margin: theme.spacing(0, 0)
    }
  },
  textfield: {
    minHeight: 75
  },
  image: {
    borderRadius: '50%'
  }
}))

export default function FilterDialog({ onConfirm, onClose, ...props }) {
  const styles = useStyles()

  const [sortBy, setSortBy] = useState(1)
  const [categoryId, setCategoryId] = useState(-1)
  const [topicId, setTopicId] = useState(-1)
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(5)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000000000)

  const { data: categories } = useGetCategoryV2()
  const topics = categories.find((item) => item.id === categoryId)?.topics || []

  function composeQuery() {
    // TODO wait for backend to add sortBy into query
    const query = {
      categoryId,
      topicId,
      minPrice,
      maxPrice,
      minRating,
      maxRating
    }

    onConfirm?.(query)
    onClose?.()
  }

  return (
    <Dialog onClose={onClose} {...props}>
      <DialogTitle>Sort and Filter</DialogTitle>
      <DialogContent className={styles.content}>
        <TextField
          className={styles.textfield}
          select
          fullWidth
          name="sort"
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value={1}>
            <ListItem dense disableGutters>
              <ListItemText>Rating descending</ListItemText>
            </ListItem>
          </MenuItem>
          <MenuItem value={2}>
            <ListItem dense disableGutters>
              <ListItemText>Price ascending</ListItemText>
            </ListItem>
          </MenuItem>
        </TextField>
        <TextField
          className={styles.textfield}
          onChange={(e) => setCategoryId(e.target.value)}
          select
          fullWidth
          value={categoryId}
          name="category"
          label="Select category"
        >
          <MenuItem value={-1}>
            <ListItem dense disableGutters>
              <ListItemText>All Categories</ListItemText>
            </ListItem>
          </MenuItem>
          {categories.map((item) => (
            <MenuItem key={item.name} value={item.id}>
              <ListItem dense disableGutters>
                <ListItemAvatar>
                  <NextImage
                    src={item.avatar}
                    alt={item.label}
                    width={32}
                    height={32}
                    className={styles.image}
                  />
                </ListItemAvatar>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={styles.textfield}
          value={topicId}
          select
          fullWidth
          name="topic"
          label="Select topic"
          onChange={(e) => setTopicId(e.target.value)}
        >
          <MenuItem value={-1}>
            <ListItem dense disableGutters>
              <ListItemText>All Topics</ListItemText>
            </ListItem>
          </MenuItem>
          {topics.map((item) => (
            <MenuItem key={item.name} value={item.id}>
              <ListItem dense disableGutters>
                <ListItemAvatar>
                  <NextImage
                    src={item.avatar}
                    alt={item.label}
                    width={32}
                    height={32}
                    className={styles.image}
                  />
                </ListItemAvatar>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex">
          <TextField
            fullWidth
            select
            type="number"
            label="Lowest rating"
            name="min-rating"
            value={minRating}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Star style={{ color: '#ffb400' }} />
                </InputAdornment>
              )
            }}
            onChange={(e) => setMinRating(e.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <Box padding={1} />
          <TextField
            select
            fullWidth
            type="number"
            label="Highest rating"
            name="max-rating"
            value={maxRating}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Star style={{ color: '#ffb400' }} />
                </InputAdornment>
              )
            }}
            onChange={(e) => setMaxRating(e.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].slice(minRating + 1).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box display="flex">
          <PriceTextField
            label="Lowest price"
            name="min-price"
            onChange={(e, number) => setMinPrice(number)}
          />
          <Box padding={1} />
          <PriceTextField
            label="Highest price"
            name="max-price"
            onChange={(e, number) =>
              setMaxPrice(number > 0 ? number : 2000000000)
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={composeQuery}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

FilterDialog.propTypes = {
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
