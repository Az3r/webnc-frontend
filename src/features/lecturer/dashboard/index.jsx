import React from 'react'
import PropTypes from 'prop-types'
import { CourseRowSkeleton } from '@/components/course/course-row'
import DefaultLayout from '@/components/layout'
import { appname } from '@/utils/app'
import {
  Box,
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
  const { user } = useAuth((u) => u.role === 'Lecturer')
  const { data, loading } = useGET(() =>
    user?.role === 'Lecturer' ? resources.lecturer.course(user.id) : undefined
  )

  return (
    <DefaultLayout>
      <Head>
        <title>Lecturer&apos;s Dashboard | {appname}</title>
      </Head>
      <Container>
        {loading && <LoadingContent />}
        {data && <DisplayContent data={data} />}
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
  return (
    <>
      <ul className={styles.ul}>
        {data.map((item) => (
          <li key={item.id}>
            <CourseItem course={item} />
          </li>
        ))}
      </ul>
      <Tooltip title="Add new Course">
        <Fab color="primary" className={styles.fab}>
          <Add />
        </Fab>
      </Tooltip>
    </>
  )
}

function CourseItem({ course, onDelete, onUpdate }) {
  const styles = useStyles()
  const { id, title, thumbnail, status, lastModified, totalLectures } = course

  const now = new Date()
  const diff = now - new Date(lastModified)
  const second = 1000
  const minute = 60 * second
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 12 * month

  let divided = second
  if (diff > year) divided = year
  else if (diff > month) divided = month
  else if (diff > day) divided = day
  else if (diff > hour) divided = hour
  else if (diff > minute) divided = minute

  let unit = 'seconds'
  if (diff > year) unit = 'years'
  else if (diff > month) unit = 'months'
  else if (diff > day) unit = 'days'
  else if (diff > hour) unit = 'hours'
  else if (diff > minute) unit = 'minutes'

  const message = `${Math.floor(diff / divided)} ${unit} ago`

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
        <Box color={status ? 'success.main' : 'info.main'}>
          <Typography color="inherit">
            Status: {status ? 'Complete' : 'In progress'}
          </Typography>
        </Box>
        <Typography className={styles.title}>{title}</Typography>
        <Typography color="textSecondary">{totalLectures} Lectures</Typography>
        <Typography color="textSecondary">Updated {message}</Typography>
      </Grid>
    </Grid>
  )
}

DisplayContent.propTypes = {
  data: PropTypes.array.isRequired
}
