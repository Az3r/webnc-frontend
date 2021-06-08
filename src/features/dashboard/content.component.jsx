import { Box, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import clsx from 'clsx'
import React from 'react'
import useStyles from './content.style'
import { useDashboard } from './dashboard.context'

export default function DashboardContent() {
  const { drawer } = useDashboard()
  const styles = useStyles()
  return (
    <main
      className={clsx(styles.root, {
        [styles.shift]: drawer
      })}
    >
      <div className={styles.toolbar} />
      <Grid container spacing={2}>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
        <Grid item>
          <SkeletonCourse />
        </Grid>
      </Grid>
    </main>
  )
}

function SkeletonCourse() {
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
