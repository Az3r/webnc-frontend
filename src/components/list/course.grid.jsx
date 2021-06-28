import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { CourseCard, CourseSkeleton } from '../course'

export default function GridCourses({ courses, skeleton }) {
  return (
    <Grid container spacing={2} component="ul" justify="space-around">
      {courses.map((item) => (
        <Grid item key={item} component="li">
          {skeleton ? <CourseSkeleton /> : <CourseCard {...item} />}
        </Grid>
      ))}
    </Grid>
  )
}

GridCourses.propTypes = {
  courses: PropTypes.array,
  skeleton: PropTypes.bool
}

GridCourses.defaultProps = {
  courses: [],
  skeleton: false
}
