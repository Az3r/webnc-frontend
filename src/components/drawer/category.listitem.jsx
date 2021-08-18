import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
  Collapse,
  Box,
  ListItemAvatar,
  makeStyles
} from '@material-ui/core'
import {
  ArrowBack,
  Category,
  KeyboardArrowDown,
  Launch
} from '@material-ui/icons'
import CollapseButton from '../button/collapse.button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'

const useStyles = makeStyles(() => ({
  avatar: {
    borderRadius: '50%'
  },
  drawer: {
    width: '100%',
    maxWidth: 320
  }
}))

const CategoryDrawer = dynamic(() => import('./category.drawer'))

export default function CategoryListItem() {
  const styles = useStyles()
  const [category, setCategory] = React.useState(null)
  const [expandCategory, setExpandCategory] = React.useState(false)
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        <ListItemSecondaryAction>
          <CollapseButton
            collapse={expandCategory}
            onClick={() => setExpandCategory((prev) => !prev)}
          >
            <KeyboardArrowDown />
          </CollapseButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expandCategory}>
        <Box paddingX={2}>
          <ListItem button onClick={() => setCategory('web')}>
            <ListItemAvatar>
              <NextImage
                src="/images/category/web.webp"
                alt="Web Development"
                width={32}
                height={32}
                className={styles.avatar}
              />
            </ListItemAvatar>
            <ListItemText primary="Web Development" />
            <ListItemSecondaryAction>
              <Link href="/web" passHref>
                <Tooltip title="Explore Web Development">
                  <IconButton>
                    <Launch />
                  </IconButton>
                </Tooltip>
              </Link>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => setCategory('mobile')}>
            <ListItemAvatar>
              <NextImage
                src="/images/category/mobile.webp"
                alt="Mobile Development"
                width={32}
                height={32}
                className={styles.avatar}
              />
            </ListItemAvatar>
            <ListItemText primary="Mobile Development" />
            <ListItemSecondaryAction>
              <Link href="/mobile" passHref>
                <Tooltip title="Explore Mobile Development">
                  <IconButton>
                    <Launch />
                  </IconButton>
                </Tooltip>
              </Link>
            </ListItemSecondaryAction>
          </ListItem>
        </Box>
      </Collapse>
      <CategoryDrawer
        category={category}
        classes={{ paper: styles.drawer }}
        open={Boolean(category)}
        anchor="right"
        onClose={() => setCategory(null)}
      >
        <Box>
          <IconButton onClick={() => setCategory(null)}>
            <ArrowBack />
          </IconButton>
        </Box>
      </CategoryDrawer>
    </>
  )
}
