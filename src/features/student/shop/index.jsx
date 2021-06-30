import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useAuth } from '@/components/hooks/auth.provider'
import {
  Tooltip,
  Grid,
  Divider,
  Container,
  makeStyles,
  Box,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import CourseRow, { CourseRowSkeleton } from '@/components/course/course-row'
import { currency } from '@/utils/intl'
import { Skeleton } from '@material-ui/lab'
import { ApiError, resources } from '@/utils/api'
import useSWR from 'swr'
import { Delete, ShoppingCart } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { animated, useTransition } from 'react-spring'
import { CoursePropTypes } from '@/utils/typing'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2)
  },
  ul: {
    ['& > li']: {
      margin: theme.spacing(2, 0)
    }
  },
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

const fetcher = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  if (response.ok) return data.results
  throw ApiError(data.error)
}

export default function ShopFeature() {
  const styles = useStyles()
  const { user } = useAuth()
  const { data: courses, error } = useSWR(
    () => (user ? resources.shop.get(user.id) : undefined),
    fetcher
  )
  const loading = !courses && !error

  return (
    <Container className={styles.root}>
      {loading && <Loading />}
      {courses && <DataAvailable courses={courses} />}
    </Container>
  )
}

const AnimatedBox = animated(Box)
function DataAvailable({ courses }) {
  const [list, setList] = useState(courses)
  const classes = useStyles()
  const transitions = useTransition(list, {
    keys: (item) => item.id,
    enter: {
      opacity: 1,
      x: 0,
      from: {
        x: -720,
        opacity: 0
      }
    },
    trail: 200
  })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const price = list.reduce((total, item) => {
    const { price, discount } = item
    return total + price * (1 - discount)
  }, 0)

  return (
    <>
      {list.length ? (
        <>
          <ul className={classes.ul}>
            {transitions((styles, item, t, index) => (
              <AnimatedBox
                display="flex"
                component="li"
                key={item.id}
                style={styles}
              >
                <CourseRow course={item} />
                <Box marginY="auto">
                  <Tooltip title="Remove from cart">
                    <IconButton
                      onClick={() => {
                        setList((prev) =>
                          prev.filter((value) => value.id !== item.id)
                        )
                        enqueueSnackbar('Item Removed', {
                          variant: 'info',
                          action: (key) => (
                            <>
                              <Button
                                onClick={() => {
                                  setList((prev) =>
                                    prev
                                      .slice(0, index)
                                      .concat([item], prev.slice(index))
                                  )
                                  closeSnackbar(key)
                                }}
                              >
                                undo
                              </Button>
                            </>
                          )
                        })
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </AnimatedBox>
            ))}
          </ul>
          <>
            <Box paddingY={2}>
              <Divider />
            </Box>
            <Typography variant="h5" color="textSecondary">
              Total Items:{' '}
              <Typography color="textPrimary" variant="h5" component="span">
                {list.length}
              </Typography>
            </Typography>
            <Typography variant="h5" align="right" color="textSecondary">
              Total Price:{' '}
              <Typography color="textPrimary" variant="h5" component="span">
                {currency(price)}
              </Typography>
            </Typography>
            <Box
              display="flex"
              marginLeft="auto"
              justifyContent="flex-end"
              paddingY={1}
              maxWidth={360}
            >
              <Button variant="contained" color="primary" fullWidth>
                purchase
              </Button>
            </Box>
          </>
        </>
      ) : (
        <EmptyList />
      )}
    </>
  )
}

function Loading() {
  return (
    <>
      <Grid container spacing={2} component="ul">
        {[0, 1, 2, 3, 4].map((index) => (
          <Grid item key={index} component="li" xs={12}>
            <CourseRowSkeleton />
          </Grid>
        ))}
      </Grid>
      <Box paddingY={2}>
        <Divider />
      </Box>
      <Box maxWidth={240} marginLeft="auto">
        <Skeleton width="100%">
          <Typography variant="h5" align="right">
            .
          </Typography>
        </Skeleton>
        <Skeleton variant="rect" width="100%">
          <Button>.</Button>
        </Skeleton>
      </Box>
    </>
  )
}

function EmptyList() {
  const styles = useStyles()
  return (
    <Container maxWidth="md" className={styles.empty}>
      <ShoppingCart color="inherit" style={{ fontSize: '5em' }} />
      <Typography align="center" variant="h3" color="inherit">
        Your cart is empty
      </Typography>
    </Container>
  )
}

DataAvailable.propTypes = {
  courses: PropTypes.arrayOf(CoursePropTypes.isRequired).isRequired
}
