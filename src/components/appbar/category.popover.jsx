import {
  Paper,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  CircularProgress
} from '@material-ui/core'
import React, { useState } from 'react'
import NextImage from 'next/image'
import useStyles from './category.style'
import { ApiError, resources } from '@/utils/api'
import useSWR from 'swr'
import NextLink from 'next/link'
import { routes } from '@/utils/app'

export default function CategoryPopover() {
  const styles = useStyles()
  const [category, setCategory] = useState(null)
  const { data } = useSWR(
    () => (category ? (category === 'web' ? 1 : 2) : null),
    fetcher
  )

  return (
    <Paper className={styles.root}>
      <Box width={320} minHeight="80vh">
        <Grid container direction="column" component="nav">
          <Grid item>
            <NextLink href={routes.category('web')} passHref>
              <ListItem
                button
                component="a"
                selected={category === 'web'}
                onMouseEnter={() => setCategory('web')}
              >
                <ListItemAvatar>
                  <NextImage
                    src="/images/category/web.webp"
                    width={40}
                    height={40}
                    alt="Web Developtment"
                    title="Web Developtment"
                    className={styles.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary="Web Development" />
              </ListItem>
            </NextLink>
          </Grid>
          <Grid item>
            <NextLink href={routes.category('mobile')} passHref>
              <ListItem
                button
                component="a"
                selected={category === 'mobile'}
                onMouseEnter={() => setCategory('mobile')}
              >
                <ListItemAvatar>
                  <NextImage
                    src="/images/category/mobile.webp"
                    width={40}
                    height={40}
                    alt="Mobile Developtment"
                    title="Mobile Developtment"
                    className={styles.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary="Mobile Development" />
              </ListItem>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
      <Box
        visibility={category ? 'visible' : 'hidden'}
        width={320}
        minHeight="80vh"
      >
        {data ? (
          <Grid container component="nav">
            {data.map((item) => {
              const { label, avatar, name } = item
              return (
                <Grid item key={name} xs={12}>
                  <NextLink href={routes.topic(category, name)} passHref>
                    <ListItem component="a" button>
                      <ListItemAvatar>
                        <NextImage
                          src={avatar}
                          width={40}
                          height={40}
                          alt={label}
                          title={label}
                          className={styles.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={label} />
                    </ListItem>
                  </NextLink>
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Paper>
  )
}

const fetcher = async (id) => {
  const response = await fetch(resources.categoryType.get(id))
  const data = await response.json()
  if (response.ok) return data.results.categories
  throw ApiError(data.error)
}
