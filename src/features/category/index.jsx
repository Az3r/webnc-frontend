import React from 'react'
import useStyles from './category.style'
import { CategoryPropTypes } from '@/utils/typing'
import { Paper, Typography, Container, Box, Grid } from '@material-ui/core'
import SkeletonCourse from '@/components/course/course-skeleton'

export default function CategoryFeature({ category }) {
  const { id, name, label, bestsellers, topics } = category
  const styles = useStyles()
  return (
    <Container>
      <Typography variant="h4" className={styles.label}>
        {label}
      </Typography>
      <Grid component="ul" container justify="center" spacing={2}>
        {bestsellers.map((course) => (
          <Grid item xs={3} key={course.title} component="li">
            <Paper>
              <SkeletonCourse />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

CategoryFeature.propTypes = {
  category: CategoryPropTypes.isRequired
}
