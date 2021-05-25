import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function DashboardPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <Typography variant="h1">Dashboard</Typography>
    </Box>
  )
}
