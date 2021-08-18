import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import useStyles from './content.style'
import LectureItem from './lecture.component'
import { CourseDetailPropTypes } from '@/utils/typing'

export default function CourseLectures({ course }) {
  const styles = useStyles()
  const { lectures } = course

  return (
    <>
      <Typography color="textPrimary" className={styles.header}>
        This Course Contains
      </Typography>
      <Paper component="ul" className={styles.ul}>
        {lectures.map((item) => (
          <LectureItem lecture={item} key={item.title} />
        ))}
      </Paper>
    </>
  )
}

CourseLectures.propTypes = {
  course: CourseDetailPropTypes.isRequired
}
