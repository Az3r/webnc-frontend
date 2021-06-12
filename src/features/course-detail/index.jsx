import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import StudentLayout from '@/components/layout/student'

export default function CourseDetail({ course }) {
  return (
    <StudentLayout>
      <Typography>Hello</Typography>
    </StudentLayout>
  )
}

CourseDetail.propTypes = {
  course: PropTypes.shape({}).isRequired
}
