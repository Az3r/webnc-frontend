import React from 'react'
import { useAuth } from '@/components/hooks/auth.provider'
import { resources, useGET } from '@/utils/api'
import { Container, Box } from '@material-ui/core'
import DefaultLayout from '@/components/layout'
import Head from 'next/head'
import { appname } from '@/utils/app'
import GridCourses from '@/components/list/course.grid'
import { CourseCardLibrary } from '@/components/course/course-card'

export default function LibraryFeature() {
  const { user } = useAuth()

  const { data } = useGET(() => resources.library.get(user.id))

  return (
    <>
      <Head>
        <title>My Library | {appname}</title>
      </Head>
      <DefaultLayout>
        <Container>
          <Box paddingY={2} position="relative">
            {!data && <LoadingList />}
            {data && <GridCourses courses={data} Item={CourseCardLibrary} />}
          </Box>
        </Container>
      </DefaultLayout>
    </>
  )
}

function LoadingList() {
  return <GridCourses courses={[0, 1, 3, 4, 5, 6, 7, 8]} skeleton />
}
