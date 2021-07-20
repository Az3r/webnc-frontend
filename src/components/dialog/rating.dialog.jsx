import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NextImage from 'next/image'

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'

export default function RatingDialog({ course, onClose, onConfirm, ...props }) {
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitReview() {
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 2000)
    onConfirm?.(rating, review)
    onClose?.()
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Review Course</DialogTitle>
      <DialogContent>
        <Typography align="center" component="div">
          <NextImage src={course.thumbnail} width={160} height={90} />
        </Typography>
        <Typography align="center" variant="h6">
          {' '}
          {course.title}
        </Typography>
        <Box paddingY={1} />
        <Typography align="center" component="div">
          <Rating
            value={rating}
            precision={0.5}
            readOnly={submitting}
            size="large"
            onChange={(_, value) => setRating(value)}
          />
        </Typography>
        <TextField
          disabled={submitting}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          variant="outlined"
          multiline
          rows={5}
          fullWidth
          placeholder="Leave a review here if you like..."
        />
      </DialogContent>
      <DialogActions>
        {submitting && <CircularProgress />}
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={submitReview}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

RatingDialog.propTypes = {
  course: {
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  },
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
}
