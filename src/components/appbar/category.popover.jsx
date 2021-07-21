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
import { useGetCategoryV2 } from '@/utils/api'
import NextLink from 'next/link'
import { routes } from '@/utils/app'

export default function CategoryPopover() {
  const styles = useStyles()
  const [category, setCategory] = useState(undefined)

  const { data: categories } = useGetCategoryV2()
  const topics =
    categories.find((item) => item.id === category?.id)?.topics || []

  return (
    <Paper className={styles.root}>
      <Box width={320} minHeight="80vh">
        <Grid container direction="column" component="nav">
          <Grid item>
            {categories.map((item) => (
              <Grid item key={item.name}>
                <NextLink href={routes.category(item.name)} passHref>
                  <ListItem
                    button
                    component="a"
                    selected={category?.id === item.id}
                    onMouseEnter={() => setCategory(item)}
                  >
                    <ListItemAvatar>
                      <NextImage
                        src={item.avatar}
                        width={40}
                        height={40}
                        alt={item.label}
                        className={styles.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={item.label} />
                  </ListItem>
                </NextLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Box
        visibility={category ? 'visible' : 'collapse'}
        width={category ? 320 : 0}
        minHeight="80vh"
      >
        {topics ? (
          <Grid container component="nav">
            {topics.map((item) => {
              const { name, label, avatar } = item
              const href = routes.topic(
                category.name,
                name || label.toLowerCase()
              )

              return (
                <Grid item key={name} xs={12}>
                  <NextLink href={href} passHref>
                    <ListItem component="a" button>
                      <ListItemAvatar>
                        <NextImage
                          src={avatar}
                          width={40}
                          height={40}
                          alt={label}
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
