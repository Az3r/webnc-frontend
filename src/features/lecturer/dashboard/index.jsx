import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CourseRowSkeleton } from '@/components/course/course-row'
import DefaultLayout from '@/components/layout'
import { appname } from '@/utils/app'
import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  makeStyles,
  Tooltip,
  Typography
} from '@material-ui/core'
import Head from 'next/head'
import { resources, useGET } from '@/utils/api'
import { useAuth } from '@/components/hooks/auth.provider'
import NextImage from 'next/image'
import { Add } from '@material-ui/icons'
import CreateCourseDialog, {
  EditCourseDialog
} from '@/components/dialog/course.dialog'
import { formatDateDifference } from '@/utils/tools'
import { LecturerCoursePropTypes } from '@/utils/typing'
import { toLecturePropTypes } from '@/utils/conversion'

const useStyles = makeStyles((theme) => ({
  title: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    lineClamp: 2,
    [theme.breakpoints.down('xs')]: {
      WebkitLineClamp: 1,
      lineClamp: 1
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  ul: {
    ['& > li']: {
      margin: theme.spacing(1, 0)
    }
  }
}))
export default function LecturerDashboard() {
  const { user } = useAuth((u) => u?.role === 'Lecturer')
  const { data, loading } = useGET(() =>
    user?.role === 'Lecturer' ? resources.lecturer.course(user.id) : undefined
  )

  const courses = data?.map(toLecturerCoursePropTypes) || []

  return (
    <DefaultLayout>
      <Head>
        <title>Lecturer&apos;s Dashboard | {appname}</title>
      </Head>
      <Container>
        {loading && <LoadingContent />}
        {data && <DisplayContent data={courses} />}
      </Container>
    </DefaultLayout>
  )
}

function LoadingContent() {
  const styles = useStyles()
  return (
    <ul className={styles.ul}>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <li key={item}>
          <CourseRowSkeleton />
        </li>
      ))}
    </ul>
  )
}

function DisplayContent({ data }) {
  const styles = useStyles()
  const [editDialog, setEditDialog] = useState(undefined)
  const [createDialog, setCreateDialog] = useState(false)

  const [courses, setCourses] = useState(data)

  function onCreate(value) {
    setCourses((prev) => [value, ...prev])
  }

  function onUpdate(value, index) {
    setCourses((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1)
    ])
  }

  function onRemove(index) {
    setCourses((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  return (
    <>
      <ul className={styles.ul}>
        {courses.map((item, index) => (
          <li key={item.id}>
            <CourseItem
              course={item}
              onClick={() => setEditDialog({ index, course: item })}
            />
          </li>
        ))}
      </ul>
      <Tooltip title="Add new Course">
        <Fab
          color="primary"
          className={styles.fab}
          onClick={() => setCreateDialog(true)}
        >
          <Add />
        </Fab>
      </Tooltip>
      <CreateCourseDialog
        open={createDialog}
        onConfirm={onCreate}
        onClose={() => setCreateDialog(false)}
      />
      <EditCourseDialog
        onClose={() => setEditDialog(undefined)}
        course={editDialog?.course}
        index={editDialog?.index}
        onConfirm={onUpdate}
        onRemove={onRemove}
      />
    </>
  )
}

function CourseItem({ course, onClick }) {
  const styles = useStyles()
  const { title, thumbnail, statusId, lastModified, lectures } = course
  const totalLectures = lectures.length

  const message = formatDateDifference(new Date(lastModified))

  return (
    <Grid container spacing={1}>
      <Grid item xs={4} sm={3} md={2}>
        <Box position="relative" height={0} paddingTop="56.25%">
          <Box position="absolute" top={0} left={0} right={0} bottom={0}>
            <NextImage
              src={thumbnail}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        <Box color={statusId === 1 ? 'success.main' : 'info.main'}>
          <Typography color="inherit">
            Status: {statusId === 1 ? 'Complete' : 'In progress'}
          </Typography>
        </Box>
        <Typography className={styles.title}>{title}</Typography>
        <Typography color="textSecondary">{totalLectures} Lectures</Typography>
        <Typography color="textSecondary">
          Updated {message} <Button onClick={onClick}>Edit</Button>
        </Typography>
      </Grid>
    </Grid>
  )
}

DisplayContent.propTypes = {
  data: PropTypes.array.isRequired
}

CourseItem.propTypes = {
  course: LecturerCoursePropTypes.isRequired,
  onClick: PropTypes.func
}

function toLecturerCoursePropTypes(course) {
  const {
    lectures,
    id,
    name,
    imageUrl,
    price,
    discount,
    shortDiscription,
    detailDiscription,
    lastUpdated,
    statusId,
    categoryId,
    categoryTypeId
  } = course
  return {
    id,
    thumbnail: imageUrl,
    title: name,
    price,
    discount,
    lastModified: lastUpdated,
    shortdesc: shortDiscription,
    detaildesc: detailDiscription,
    statusId,
    categoryId: categoryTypeId,
    topicId: categoryId,
    lectures: lectures?.map(toLecturePropTypes) || []
  }
}
