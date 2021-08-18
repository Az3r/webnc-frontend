import React from 'react'
import useStyles from './category.style'
import { CategoryPropTypes, TopicPropTypes } from '@/utils/typing'
import {
  Paper,
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Collapse,
  Button
} from '@material-ui/core'
import { CourseCard, CourseRow } from '@/components/course'
import NextLink from '@/components/nextlink'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { appname, routes } from '@/utils/app'
import NextImage from 'next/image'
import CollapseButton from '@/components/button/collapse.button'
import DefaultLayout from '@/components/layout'
import Head from 'next/head'

export default function CategoryFeature({ category }) {
  const { label, bestsellers, topics } = category
  const styles = useStyles()

  return (
    <>
      <Head>
        <title>
          &quot;{category.label}&quot; Category | {appname}
        </title>
      </Head>
      <DefaultLayout>
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
                  key={course.title}
                  component="li"
                >
                  <Box
                    maxWidth={360}
                    position="relative"
                    left="50%"
                    top="50%"
                    style={{ transform: 'translate(-50%,-50%)' }}
                  >
                    <Paper>
                      <CourseCard course={course} />
                    </Paper>
                  </Box>
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
          <ul>
            {topics.map((topic) => (
              <Box component="li" key={topic.id}>
                <CourseList category={category} topic={topic} />
              </Box>
            ))}
          </ul>
        </Container>
      </DefaultLayout>
    </>
  )
}

CategoryFeature.propTypes = {
  category: CategoryPropTypes.isRequired
}

function CourseList({ category, topic }) {
  const styles = useStyles()
  const { name = '', avatar = '', courses = [] } = topic

  const [collapse, setCollapse] = React.useState(false)

  function VisibleList() {
    const elements = []
    for (let i = 0; i < Math.min(courses.length, 5); i++) {
      const course = courses[i]
      elements.push(
        <Box paddingY={2} key={course.id} component="li">
          <CourseRow course={course} />
        </Box>
      )
    }
    return elements
  }

  function CollapsableList() {
    const elements = []
    for (let i = 0; i < Math.max(courses.length - 5, 0); i++) {
      const course = courses[i + 5]
      elements.push(
        <Box paddingY={2} key={course.id} component="li">
          <CourseRow course={course} />
        </Box>
      )
    }
    return elements
  }

  return (
    <Box paddingY={2}>
      <Box display="flex" alignItems="center">
        <NextImage
          width={48}
          height={48}
          src={avatar}
          alt={name}
          className={styles.avatar}
        />
        <Box paddingX={0.5} />
        <NextLink href={routes.topic(category.name, name)} color="inherit">
          <Typography variant="h5" className={styles.label}>
            {name}
          </Typography>
        </NextLink>
        <Box flexGrow={1} />
        <CollapseButton
          collapse={collapse}
          onClick={() => setCollapse((prev) => !prev)}
        />
      </Box>
      <ul>
        {VisibleList()}
        <Collapse in={collapse}>{CollapsableList()}</Collapse>
      </ul>
      {courses.length > 5 && (
        <Button
          onClick={() => setCollapse((prev) => !prev)}
          height={8}
          fullWidth
          className={styles.expand_button}
        >
          {collapse ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown color="action" />
          )}
          <Typography variant="button" color="textSecondary">
            {collapse ? 'show less' : 'show more'}
          </Typography>
          {collapse ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown color="action" />
          )}
        </Button>
      )}
    </Box>
  )
}

CourseList.propTypes = {
  category: CategoryPropTypes.isRequired,
  topic: TopicPropTypes.isRequired
}
