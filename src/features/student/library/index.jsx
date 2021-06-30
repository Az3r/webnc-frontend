import React from 'react'
import { useAuth } from '@/components/hooks/auth.provider'
import { resources, useGET } from '@/utils/api'
import { Container, Box } from '@material-ui/core'
import ListCourses from '@/components/list/course.list'

export default function LibraryFeature() {
  const { user } = useAuth()
  const { data, error, loading } = useGET(() => resources.library.get(user.id))
  return (
    <Container>
      <Box paddingY={2}>
        {loading && <LoadingList />}
        {data && <ListCourses courses={data} />}
      </Box>
    </Container>
  )
}

function LoadingList() {
  return <ListCourses courses={[0, 1, 3, 4, 5, 6, 7, 8]} skeleton />
}
