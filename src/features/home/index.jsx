import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import DefaultLayout from '@/components/layout'
import {
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import CourseList from './course.list'
import Link from '@/components/nextlink'
import { routes } from '@/utils/app'
import NextImage from 'next/image'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    ['&>*']: {
      margin: theme.spacing(2)
    }
  },
  section: {
    ['& > *']: {
      margin: theme.spacing(1)
    }
  },
  avatar: {
    borderRadius: '50%'
  }
}))
export default function HomePage({
  trending,
  mostViewed,
  newest,
  mostRegistered
}) {
  const styles = useStyles()
  return (
    <DefaultLayout>
      <Head>
        <title>Urskyll - Online Courses, Catch Up To Modern Technology</title>
      </Head>
      <Container style={{ maxWidth: 1600 }}>
        <div className={styles.root}>
          <div className={styles.section}>
            <Typography variant="h4">Top Trending</Typography>
            <CourseList courses={trending} />
          </div>
          <div className={styles.section}>
            <Typography variant="h4">Most Viewed Courses</Typography>
            <CourseList courses={mostViewed} />
          </div>
          <div className={styles.section}>
            <Typography variant="h4">Latest Courses</Typography>
            <CourseList courses={newest} />
          </div>
          <div className={styles.section}>
            <Typography variant="h4">Most Registered Topics</Typography>
            <Grid container spacing={2} component="ul">
              {mostRegistered.map((item) => (
                <Grid item key={item.name} component="li">
                  <Link
                    href={routes.topic(
                      item.categoryTypeId === 1 ? 'web' : 'mobile',
                      item.name
                    )}
                    passHref
                  >
                    <ListItem button component="a">
                      <ListItemAvatar>
                        <NextImage
                          width={40}
                          height={40}
                          src={item.avatar}
                          alt={item.label}
                          className={styles.avatar}
                        />
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
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

HomePage.propTypes = {
  trending: PropTypes.array.isRequired,
  mostViewed: PropTypes.array.isRequired,
  newest: PropTypes.array.isRequired,
  mostRegistered: PropTypes.array.isRequired
}

HomePage.defaultProps = {
  courses: []
}
