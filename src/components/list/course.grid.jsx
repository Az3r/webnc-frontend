import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import CourseCard, { CourseCardSkeleton } from '@/components/course/course-card'

export default function GridCourses({
  courses,
  skeleton,
  children,
  Item = CourseCard,
  xs = 12,
  sm = 6,
  md = 4,
  lg = 3
}) {
  return (
    <Grid container spacing={2} component="ul">
      {courses.map((item, index) => (
        <Grid
          item
          key={skeleton ? index : item.id}
          component="li"
          lg={lg}
          md={md}
          sm={sm}
          xs={xs}
        >
          {skeleton ? <CourseCardSkeleton /> : <Item course={item} />}
        </Grid>
      ))}
      {children}
    </Grid>
  )
}

GridCourses.propTypes = {
  courses: PropTypes.array,
  skeleton: PropTypes.bool,
  children: PropTypes.node,
  Item: PropTypes.func,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number
}

GridCourses.defaultProps = {
  courses: [],
  skeleton: false
}
