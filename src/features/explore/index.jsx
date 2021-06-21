import React from 'react'
import PropTypes from 'prop-types'
import GridCourses from '@/components/list/course.grid'
import { Box, Divider, Breadcrumbs, Link, Typography } from '@material-ui/core'
import useStyles from './explore.style'
import StudentLayout from '@/components/layout/student'
import NextLink from 'next/link'

export default function ExploreFeature({ category, topic }) {
  const styles = useStyles()
  return (
    <StudentLayout>
      <Breadcrumbs aria-label="breadcrumb">
        <NextLink href="/" passHref>
          <Link color="inherit">Material-UI</Link>
        </NextLink>
        <NextLink href="/demo/markdown" passHref>
          <Link color="inherit">Core</Link>
        </NextLink>
        <Typography color="secondary">Breadcrumb</Typography>
      </Breadcrumbs>
      <GridCourses courses={[1, 2, 3, 4]} skeleton />
      <Divider className={styles.divider} />
      <Box className={styles.title} />
      <GridCourses courses={[1, 2, 3, 4, 5, 6, 7, 8]} skeleton />
    </StudentLayout>
  )
}

ExploreFeature.propTypes = {
  category: PropTypes.string,
  topic: PropTypes.string
}
