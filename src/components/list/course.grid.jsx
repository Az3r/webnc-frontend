import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CourseCard, { CourseCardSkeleton } from '@/components/course/course-card'

export default function GridCourses({ courses, skeleton, children }) {
  return (
    <Grid container spacing={2} component="ul">
      {courses.map((item, index) => (
        <Grid
          item
          key={skeleton ? index : item.id}
          component="li"
          lg={3}
          md={4}
          sm={6}
          xs={12}
        >
          {skeleton ? <CourseCardSkeleton /> : <CourseCard course={item} />}
        </Grid>
      ))}
      {children}
    </Grid>
  )
}

GridCourses.propTypes = {
  courses: PropTypes.array,
  skeleton: PropTypes.bool,
  children: PropTypes.node
}

GridCourses.defaultProps = {
  courses: [],
  skeleton: false
}
