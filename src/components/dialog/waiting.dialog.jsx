import React from 'react'
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  CircularProgress
} from '@material-ui/core'
import NextImage from 'next/image'

export default function WaitingDialog(props) {
  return (
    <Dialog fullWidth maxWidth="sm" {...props}>
      <DialogContent>
        <Typography align="center" component="div">
          <NextImage
            width={64}
            height={64}
            src="/images/logo_icon.webp"
            alt="App's logo"
          />
        </Typography>
        <Box paddingY={4}>
          <Typography align="center" component="div">
            <CircularProgress />
            <Box paddingY={2} />
            <Typography variant="h5">
              Processing your request, please wait...
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
