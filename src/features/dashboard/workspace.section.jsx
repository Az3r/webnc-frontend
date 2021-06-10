import React from 'react'
import GridCourses from '@/components/list/grid-course'
import { Box, Divider, Typography } from '@material-ui/core'
import useStyles from './workspace.style'

export default function DashboardWorkspace() {
  const styles = useStyles()
  return (
    <Box>
      <Typography className={styles.title}>You are watching</Typography>
      <GridCourses courses={[1, 2, 3, 4]} skeleton />
      <Divider className={styles.divider} />
      <Typography className={styles.title}>Your Courses</Typography>
      <GridCourses courses={[1, 2, 3, 4, 5, 6, 7, 8]} skeleton />
      <Divider className={styles.divider} />
      <Typography className={styles.title}>Recently Uploaded</Typography>
      <GridCourses courses={[3, 5, 6, 7, 8]} skeleton />
      <Divider className={styles.divider} />
      <Typography className={styles.title}>Trending</Typography>
      <GridCourses courses={[5, 6, 7, 8]} skeleton />
    </Box>
  )
}
