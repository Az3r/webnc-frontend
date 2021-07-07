import PropTypes from 'prop-types'
import React from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'

export default function LabelProgress({ value }) {
  return (
    <Box position="relative" display="inline-flex" color="success.dark">
      <CircularProgress value={value} variant="determinate" color="inherit" />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div">{`${Math.round(
          value ?? 0
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

LabelProgress.propTypes = {
  value: PropTypes.number.isRequired
}
