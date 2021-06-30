import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import Link from 'next/link'
import NextLink from '@/components/nextlink'
import { TopicPropTypes } from '@/utils/typing'
import { routes } from '@/utils/app'
import useStyles from './topic.style'
import { Pagination } from '@material-ui/lab'
import { useSpring } from 'react-spring'
import GridCourses from '@/components/list/course.grid'

export default function TopicFeature({ topic }) {
  const { others, courses, label, category } = topic
  const styles = useStyles()

  const size = useRef(10)
  const pages = useRef([courses])
  const [display, setDisplay] = useState(courses)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [, animation] = useSpring(() => ({
    scroll: 0,
    onChange: ({ value }) => window.scroll(0, value.scroll)
  }))

  useEffect(() => {
    animation.start({ from: { scroll: window.scrollY }, scroll: 0 })
    if (pages.current[offset]) setDisplay(pages.current[offset])
    else onLoadPage(size.current, offset)
  }, [offset])

  async function onLoadPage(size, offset) {
    setLoading(true)

    setTimeout(() => {
      // do something
      setLoading(false)
    }, 1000)
  }

  return (
    <Container className={styles.root}>
      <Breadcrumbs separator={<NavigateNext />}>
        <NextLink color="inherit" href={routes.category(category.name)}>
          <Typography variant="h6" className={styles.label}>
            {category.label}
          </Typography>
        </NextLink>
        <Typography variant="h5" color="textPrimary" className={styles.label}>
          {label}
        </Typography>
      </Breadcrumbs>
      <Box paddingY={1} />
      <GridCourses skeleton={loading} courses={courses}>
        <Grid item xs={12} container justify="center" alignItems="center">
          <Pagination
            page={offset + 1}
            siblingCount={2}
            onChange={(e, page) => setOffset(page - 1)}
            count={size.current}
            color="primary"
            className={styles.pagination}
            size="large"
          />
        </Grid>
      </GridCourses>
      <Box paddingY={2} />
      <Typography variant="h5" className={styles.label}>
        checkout other topics:
      </Typography>
      <Box paddingY={1} />
      <Grid container spacing={2} component="ul">
        {others.map((item) => (
          <Grid item key={item.name} component="li">
            <Link href={routes.topic(category.name, item.name)} passHref>
              <ListItem button component="a">
                <ListItemAvatar>
                  <Avatar src={item.avatar} alt={item.label} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

TopicFeature.propTypes = {
  topic: TopicPropTypes.isRequired
}
