import React, { useState, useRef, useEffect } from 'react'
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
import { Pagination } from '@material-ui/lab'
import { useSpring } from 'react-spring'
import GridCourses from '@/components/list/course.grid'
import DefaultLayout from '@/components/layout'
import { fetchGET, resources, useGET } from '@/utils/api'
import { toCoursePropTypesV2 } from '@/utils/conversion'
import Head from 'next/head'

export default function TopicFeature({ topic }) {
  const { others, courses, label, category, id } = topic
  const styles = useStyles()

  const size = useRef(10)
  const [totalpages, setTotalPages] = useState(1)
  const [offset, setOffset] = useState(1)

  const [, animation] = useSpring(() => ({
    scroll: 0,
    onChange: ({ value }) => window.scroll(0, value.scroll)
  }))

  useEffect(() => {
    fetchGET(resources.topic.course(id, size.current, 1)).then((data) => {
      const { paginationStatus } = data
      setTotalPages(paginationStatus?.totalPages || 1)
    })
  }, [])

  useEffect(() => {
    animation.start({ from: { scroll: window.scrollY }, scroll: 0 })
  }, [offset])

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
        <Box paddingY={1} />
        {offset === 1 && <GridCourses courses={courses} />}
        {offset > 1 && <Page id={id} offset={offset} size={size.current} />}
        <Box display="none">
          <Page id={id} offset={offset + 1} size={size.current} />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingY={2}
        >
          <Pagination
            page={offset}
            siblingCount={2}
            onChange={(e, page) => setOffset(page)}
            count={totalpages}
            color="primary"
            size="large"
          />
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

function Page({ id, size, offset }) {
  const { data, loading } = useGET(resources.topic.course(id, size, offset))

  let courses = []
  if (data && data.paginationStatus?.pageNumber === offset)
    courses = data.courses.map(toCoursePropTypesV2)

  return (
    <>
      {loading && <GridCourses skeleton courses={new Array(size)} />}
      <GridCourses courses={courses} />
    </>
  )
}
