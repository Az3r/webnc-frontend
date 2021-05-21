import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useStyles from './drawer.style'
import {
  Category,
  Close,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  GroupAdd
} from '@material-ui/icons'
import Link from 'next/link'
import { routes } from '../utils/app'

const DrawerContext = React.createContext({
  open: false,
  toggle: () => {}
})

export default function DrawerHome({ children }) {
  const styles = useStyles()
  const [open, toggle] = React.useState(false)
  return (
    <DrawerContext.Provider value={{ open, toggle }}>
      <Drawer anchor="right" open={open} onClose={() => toggle(false)}>
        <Box>
          <IconButton onClick={() => toggle(false)}>
            <Close />
          </IconButton>
        </Box>
        <div className={styles.drawer}>
          <List>
            <CategoryListItem />
            <Divider />
            <Link href={routes.login}>
              <ListItem button>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItem>
            </Link>
            <Link href={routes.register}>
              <ListItem button>
                <ListItemIcon>
                  <GroupAdd />
                </ListItemIcon>
                <ListItemText>Sign up</ListItemText>
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      {children}
    </DrawerContext.Provider>
  )
}

function CategoryListItem() {
  const [open, toggle] = useState(false)
  const styles = useStyles()
  return (
    <>
      <ListItem button onClick={() => toggle((prev) => !prev)}>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText>Categories</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={styles.subitems}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar src="images/category_web.webp" className={styles.icon} />
            </ListItemAvatar>
            <ListItemText primary="Web development" />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                src="images/category_mobile.webp"
                className={styles.icon}
              />
            </ListItemAvatar>
            <ListItemText primary="Mobile development" />
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}

function useDrawer() {
  return React.useContext(DrawerContext)
}

export { useDrawer }

DrawerHome.propTypes = {
  children: PropTypes.node.isRequired
}
