import React from 'react'
import GridCourses from '@/components/list/grid-course'
import { Box, Divider, Typography } from '@material-ui/core'
import useStyles from './workspace.style'

export default function DashboardWorkspace() {
  const styles = useStyles()
  return (
    <Box>
      <GridCourses courses={[1, 2, 3, 4]} skeleton />
      <Divider className={styles.divider} />
      <Box className={styles.title} />
      <GridCourses courses={[1, 2, 3, 4, 5, 6, 7, 8]} skeleton />
    </Box>
  )
}
