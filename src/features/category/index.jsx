import React from 'react'
import useStyles from './category.style'
import { CategoryPropTypes } from '@/utils/typing'
import {
  Paper,
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Avatar
} from '@material-ui/core'
import { Course } from '@/components/course'
import CourseRow from 'pages/demo/course'
import NextLink from 'next/link'

export default function CategoryFeature({ category }) {
  const { name, label, bestsellers, topics } = category
  const styles = useStyles()

  return (
    <Container maxWidth="lg">
      <Box paddingY={2}>
        <Typography variant="h4" className={styles.label}>
          popular courses for &quot;{label}&quot;
        </Typography>
        <Box paddingTop={1} paddingBottom={2}>
          <Divider />
        </Box>
      </Box>
      <Box minHeight="33vh" alignItems="center" display="flex">
        <Grid component="ul" container justify="center" spacing={2}>
          {bestsellers.map((course) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={course.title}
              component="li"
            >
              <Paper>
                <Course course={course} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box paddingBottom={2} paddingTop={4}>
        <Typography variant="h4" className={styles.label}>
          all categories for &quot;{label}&quot;
        </Typography>
        <Box paddingTop={1} paddingBottom={2}>
          <Divider />
        </Box>
      </Box>
      {topics.map((topic) => (
        <Box component="li" key={topic.id}>
          <Box paddingY={2}>
            <Box display="flex" alignItems="center">
              <Avatar
                src={topic.avatar}
                alt={topic.name}
                className={styles.avatar}
              />
              <Box paddingX={0.5} />
              <NextLink href={`/category/${name}/${topic.name}`}>
                <Typography variant="h5" className={styles.label}>
                  {topic.name}
                </Typography>
              </NextLink>
            </Box>
            {topic.courses.map((course) => (
              <Box
                paddingLeft={4}
                paddingRight={0}
                paddingY={2}
                key={course.id}
              >
                <CourseRow course={course} />
              </Box>
            ))}
          </Box>
          <Divider variant="middle" />
        </Box>
      ))}
    </Container>
  )
}

CategoryFeature.propTypes = {
  category: CategoryPropTypes.isRequired
}
