import React from 'react'
import { Container, Box, Divider } from '@material-ui/core'
import CourseThumbnail from './thumbnail.component'
import CourseInfo from './info.component'
import CourseLectures from './content.component'
import CourseContent from './detail.component'

export default function CourseDetail({ course }) {
  return (
    <>
      <CourseThumbnail course={course} />
      <Container maxWidth="md">
        <Box paddingY={1} />
        <CourseInfo course={course} />
        <Box paddingY={2}>
          <Divider />
        </Box>
        <CourseLectures course={course} />
        <Box paddingY={1} />
        <CourseContent course={course} />
        <Box height="15vh" />
      </Container>
    </>
  )
}
