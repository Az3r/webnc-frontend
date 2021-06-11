import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './category.style'

const categories = [
  {
    id: '1',
    name: 'web',
    title: 'Web Development',
    icon: 'images/category_web.webp',
    courses: [
      { id: 1, label: 'Vue.js', icon: 'images/course_vue.svg' },
      {
        id: 2,
        label: 'React.js',
        icon: 'images/course_react.svg'
      },
      {
        id: 3,
        label: 'Angular.js',
        icon: 'images/course_angular.svg'
      }
    ]
  },
  {
    id: '2',
    name: 'mobile',
    title: 'Mobile Development',
    icon: 'images/category_mobile.webp',
    courses: [
      {
        id: 2,
        label: 'React Native',
        icon: 'images/course_react.svg'
      },
      {
        id: 3,
        label: 'Flutter',
        icon: 'images/course_flutter.svg'
      }
    ]
  }
]

export default function CategoryPopover({ onMouseEnter, onMouseLeave }) {
  const styles = useStyles()
  const [category, show] = useState(null)

  return (
    <Box
      className={styles.root}
      component="nav"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Grid container className={styles.grid}>
        {categories.map((item) => (
          <Grid item key={item.name}>
            <ListItem
              button
              onMouseEnter={() => show(item.name)}
              onTouchEnd={() => show(item.name)}
              selected={category === item.name}
            >
              <ListItemAvatar>
                <Avatar size={64} src={item.icon} />
              </ListItemAvatar>
              <ListItemText primary={item.title} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Collapse in={Boolean(category)}>
        <Grid container className={styles.grid}>
          {courses(category).map((course) => (
            <Grid item key={course.label}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar variant="square" src={course.icon} />
                </ListItemAvatar>
                <ListItemText primary={course.label} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Box>
  )
}

function courses(category) {
  const item = categories.find((e) => e.name === category)
  if (item) return item.courses
  return []
}

CategoryPopover.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

CategoryPopover.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {}
}
