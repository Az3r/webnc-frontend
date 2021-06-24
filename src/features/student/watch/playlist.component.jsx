import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'

export default function WatchPlaylist() {
  return (
    <Paper>
      <Box width="30vw">
        <Box position="sticky" top={0} left={0}>
          <Typography align="center" variant="h6">
            Playlist
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
