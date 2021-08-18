import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import CourseRow, { CourseRowSkeleton } from '../course/course-row'

const useStyles = makeStyles((theme) => ({
  ul: {
    ['& > li']: {
      margin: theme.spacing(2, 0)
    }
  }
}))

export default function ListCourses({ courses, skeleton, children }) {
  const styles = useStyles()
  return (
    <ul className={styles.ul}>
      {courses.map((item, index) => (
        <li key={skeleton ? index : item.id}>
          {skeleton ? <CourseRowSkeleton /> : <CourseRow course={item} />}
        </li>
      ))}
      {children}
    </ul>
  )
}

ListCourses.propTypes = {
  courses: PropTypes.array,
  skeleton: PropTypes.bool,
  children: PropTypes.node
}

ListCourses.defaultProps = {
  courses: [],
  skeleton: false
}
