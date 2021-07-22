import React from 'react'
import { useAuth } from '@/components/hooks/auth.provider'
import { resources, useGET } from '@/utils/api'
import { Container, Box, makeStyles, Typography } from '@material-ui/core'
import DefaultLayout from '@/components/layout'
import Head from 'next/head'
import { appname } from '@/utils/app'
import GridCourses from '@/components/list/course.grid'
import { CourseCardLibrary } from '@/components/course/course-card'
import { toLibraryCoursePropTypes } from '@/utils/conversion'
import { VideoLibrary } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  empty: {
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    ['& > *']: {
      margin: theme.spacing(1)
    }
  }
}))

export default function LibraryFeature() {
  const { user } = useAuth((u) => Boolean(u))
  const { data, loading } = useGET(() =>
    user ? resources.library.get(user.id) : undefined
  )

  const courses = data?.map(toLibraryCoursePropTypes) || []

  return (
    <>
      <Head>
        <title>My Library | {appname}</title>
      </Head>
      <DefaultLayout>
        <Container>
          <Box paddingY={2} position="relative">
            {loading ? (
              <LoadingList />
            ) : (
              <>
                {data?.length ? (
                  <GridCourses courses={courses} Item={CourseCardLibrary} />
                ) : (
                  <EmptyList />
                )}
              </>
            )}
          </Box>
        </Container>
      </DefaultLayout>
    </>
  )
}

function LoadingList() {
  return <GridCourses courses={[0, 1, 3, 4, 5, 6, 7, 8]} skeleton />
}

function EmptyList() {
  const styles = useStyles()
  return (
    <Container maxWidth="md" className={styles.empty}>
      <VideoLibrary color="inherit" style={{ fontSize: '5em' }} />
      <Typography align="center" variant="h3" color="inherit">
        Your library is empty
      </Typography>
    </Container>
  )
}
