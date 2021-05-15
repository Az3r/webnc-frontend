import Banner from '@/home/banner.component'
import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function HomePage() {
  return (
    <>
      <Banner />
      <Box>
        <Typography>body</Typography>
      </Box>
    </>
  )
}
