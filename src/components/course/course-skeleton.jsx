import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
export default function SkeletonCourse() {
  return (
    <Box width={384} display="flex" flexDirection="column">
      <Skeleton variant="rect" width={384} height={216} />
      <Box paddingY={1} display="flex">
        <Skeleton variant="circle" width={48} height={48}></Skeleton>
        <Box flexGrow={1} paddingLeft={1} display="flex" flexDirection="column">
          <Skeleton width="100%" variant="text">
            <Typography variant="subtitle1">.</Typography>
            <Typography variant="subtitle1">.</Typography>
          </Skeleton>
          <Skeleton width="100%" variant="text">
            <Typography variant="subtitle2">.</Typography>
          </Skeleton>
          <Skeleton width="100%" variant="text">
            <Typography variant="h6">.</Typography>
          </Skeleton>
        </Box>
      </Box>
    </Box>
  )
}
