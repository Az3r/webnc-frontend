import React, { useState } from 'react'
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
import { currency } from '@/utils/tools'
import { Skeleton } from '@material-ui/lab'
import { fetchPOST, resources, useGET } from '@/utils/api'
import { Delete, ShoppingCart } from '@material-ui/icons'
import DefaultLayout from '@/components/layout'
import Head from 'next/head'
import { appname } from '@/utils/app'
import { toCoursePropTypesV2 } from '@/utils/conversion'
import { useSnackbar } from 'notistack'
import ConfirmDialog from '@/components/dialog/confirm.dialog'
import WaitingDialog from '@/components/dialog/waiting.dialog'

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

export default function ShopFeature() {
  const styles = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAuth()
  const { data, loading, mutate } = useGET(() =>
    user ? resources.shop.get(user.id) : undefined
  )

  const courses = data?.map(toCoursePropTypesV2) || []
  const [itemToRemove, setItemToRemove] = useState(undefined)
  const [purchasing, setPurchasing] = useState(false)

  const price = courses.reduce((total, item) => {
    const { price, discount } = item
    return total + price * (1 - discount)
  }, 0)

  function onItemRemove(index) {
    enqueueSnackbar('Remove from Cart', {
      variant: 'info'
    })
    mutate([...data.slice(0, index), ...data.slice(index + 1)], false)

    fetchPOST(resources.shop.remove, {
      studentId: user.id,
      courseId: courses[index].id
    })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
      })
      .finally(() => mutate())
  }

  async function onPurchase() {
    setPurchasing(true)
    try {
      // purchase courses
      await fetchPOST(
        resources.library.post,
        courses.map((item) => ({ studentId: user.id, courseId: item.id }))
      )

      // remove courses from cart
      const tasks = courses.map((item) => {
        return fetchPOST(resources.shop.remove, {
          studentId: user.id,
          courseId: item.id
        })
      })
      await Promise.all(tasks)
      mutate()

      enqueueSnackbar('Purchase successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <DefaultLayout>
      <Head>
        <title>My Shopping Cart | {appname}</title>
      </Head>
      <Container className={styles.root}>
        {loading && <Loading />}
        <ul className={styles.ul}>
          {courses.map((item, index) => (
            <Box display="flex" component="li" key={item.id}>
              <CourseRow course={item} />
              <Box marginY="auto">
                <Tooltip title="Remove from cart">
                  <IconButton onClick={() => setItemToRemove(index)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </ul>
        {courses.length > 0 && (
          <>
            <Box paddingY={2}>
              <Divider />
            </Box>
            <Typography variant="h5" color="textSecondary">
              Total Items:{' '}
              <Typography color="textPrimary" variant="h5" component="span">
                {courses.length}
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onPurchase}
              >
                purchase
              </Button>
            </Box>
          </>
        )}
        {!courses.length && <EmptyList />}
      </Container>
      <ConfirmDialog
        open={itemToRemove != undefined}
        title="Remove from Cart"
        message="You are about to remove an item from Cart, please confirm your action?"
        onClose={() => setItemToRemove(undefined)}
        onConfirm={() => onItemRemove(itemToRemove)}
      />
      <WaitingDialog maxWidth="sm" open={purchasing} />
    </DefaultLayout>
  )
}

function Loading() {
  return (
    <>
      <Grid container spacing={2} component="ul">
        {[0, 1, 2, 3, 4, 5].map((index) => (
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
