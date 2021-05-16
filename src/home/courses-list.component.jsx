import React from 'react'
import PropTypes from 'prop-types'
import Course from '@/home/course.component'
import { Box, Grid } from '@material-ui/core'

export default function CourseList({ courses }) {
  return (
    <Grid spacing={1} container justify="center">
      {courses.map((item) => (
        <Grid item key={item.id} component="li">
          <Course {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
}

CourseList.defaultProps = {
  courses: []
}
