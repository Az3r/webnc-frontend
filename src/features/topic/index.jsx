import React from 'react'
import {
  Box,
  Breadcrumbs,
  Container,
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
import { appname, routes } from '@/utils/app'
import useStyles from './topic.style'
import GridCourses from '@/components/list/course.grid'
import DefaultLayout from '@/components/layout'
import Head from 'next/head'

export default function TopicFeature({ topic }) {
  const { others, courses, label, category, id } = topic
  const styles = useStyles()

  return (
    <DefaultLayout>
      <Head>
        <title>
          &quot;{label}&quot; Topic - &quot;{category.label}&quot; Category |{' '}
          {appname}
        </title>
      </Head>
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
        <Box paddingY={2}>
          <GridCourses courses={courses} />
        </Box>
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
    </DefaultLayout>
  )
}

TopicFeature.propTypes = {
  topic: TopicPropTypes.isRequired
}
