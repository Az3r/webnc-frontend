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
import { resources, useGET } from '@/utils/api'
import NextLink from 'next/link'
import { routes } from '@/utils/app'

export default function CategoryPopover() {
  const styles = useStyles()
  const [category, setCategory] = useState(null)
  const id = category ? (category === 'web' ? 1 : 2) : null
  const { data } = useGET(() => (id ? resources.categoryType.get(id) : null))
  const categories = data?.categories

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
        visibility={category ? 'visible' : 'collapse'}
        width={category ? 320 : 0}
        minHeight="80vh"
      >
        {categories ? (
          <Grid container component="nav">
            {categories.map((item) => {
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
