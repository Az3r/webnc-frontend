import React from 'react'
import GridCourses from '@/components/list/course.grid'
import { Box, Divider } from '@material-ui/core'
import useStyles from './explore.style'
import StudentLayout from '@/components/layout/student'

export default function ExplorePage() {
  const styles = useStyles()
  return (
    <StudentLayout>
      <GridCourses courses={[1, 2, 3, 4]} skeleton />
      <Divider className={styles.divider} />
      <Box className={styles.title} />
      <GridCourses courses={[1, 2, 3, 4, 5, 6, 7, 8]} skeleton />
    </StudentLayout>
  )
}
