import React, { useEffect, useState } from 'react'
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
import { fetchPOST, resources, useGET } from '@/utils/api'
import { useSnackbar } from 'notistack'
import { useAuth } from '../hooks/auth.provider'

export default function RatingDialog({ course, onClose, ...props }) {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { data, mutate } = useGET(() =>
    user ? resources.feedback.get(user.id, course.id) : undefined
  )

  useEffect(() => {
    if (data) {
      setRating(data.rate)
      setReview(data.review)
    }
  }, [data])

  async function submitReview() {
    setSubmitting(true)
    try {
      await fetchPOST(
        resources.feedback.post,
        {
          id: data?.id ? data.id : undefined,
          rate: rating,
          review: review.trim(),
          courseId: course.id,
          userId: user.id
        },
        { method: data?.id ? 'PUT' : 'POST' }
      )
      enqueueSnackbar('Thank you for reviewing this course', {
        variant: 'success'
      })
      onClose?.()
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    } finally {
      setSubmitting(false)
      mutate()
    }
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
            name="rating"
            readOnly={submitting}
            size="large"
            disabled={submitting}
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
          name="review"
          placeholder="Leave a review here if you like..."
        />
      </DialogContent>
      <DialogActions>
        {submitting && <CircularProgress />}
        <Button autoFocus onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button color="primary" onClick={submitReview} disabled={submitting}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

RatingDialog.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
}
