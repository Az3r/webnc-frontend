import React from 'react'
import PropTypes from 'prop-types'
import { useGetCategory, useGetCategoryV2 } from '@/utils/api'
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { routes } from '@/utils/app'

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%'
  }
})

export default function CategoryDrawer({ category, children, ...props }) {
  const styles = useStyles()

  const { data: categories } = useGetCategoryV2()
  const topics = categories.find((item) => item.name === category)?.topics || []

  return (
    <Drawer {...props}>
      {children}
      <List component="nav">
        {!topics &&
          [1, 2, 3, 4, 5, 6, 7].map((item) => <TopicSkeleton key={item} />)}

        {topics?.map((item) => {
          const { label, avatar, name } = item
          return (
            <NextLink href={routes.topic(category, name)} passHref key={name}>
              <ListItem component="a" button>
                <ListItemAvatar>
                  <NextImage
                    src={avatar}
                    width={32}
                    height={32}
                    alt={label}
                    className={styles.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary={label} />
              </ListItem>
            </NextLink>
          )
        })}
      </List>
    </Drawer>
  )
}

function TopicSkeleton() {
  return (
    <ListItem component="div">
      <ListItemAvatar>
        <Skeleton variant="circle" width={32} height={32} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        }
        disableTypography
      />
    </ListItem>
  )
}

CategoryDrawer.propTypes = {
  category: PropTypes.string,
  children: PropTypes.node
}
