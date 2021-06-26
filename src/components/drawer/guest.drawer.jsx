import React from 'react'
import PropTypes from 'prop-types'
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Box,
  ListItem,
  Divider
} from '@material-ui/core'
import { Brightness4, Category, ExitToApp, GroupAdd } from '@material-ui/icons'
import NextImage from 'next/image'
import { useApp } from '@/app.theme'
import Link from 'next/link'
import { routes } from '@/utils/app'

/**
 * @param {import('@material-ui/core').DrawerProps} props
 */
export default function GuestDrawer({ children, ...props }) {
  const { theme, setTheme } = useApp()
  return (
    <Drawer {...props}>
      {children}
      <Box marginX="auto">
        <NextImage
          priority
          width={64}
          height={64}
          title="app's logo"
          src="/images/logo_icon.webp"
        />
      </Box>
      <List component="nav">
        <ListItem>
          <ListItemIcon>
            <Brightness4 />
          </ListItemIcon>
          <ListItemText primary="Dark Theme" />
          <ListItemSecondaryAction>
            <Switch
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <Divider variant="middle" />
        <Link href={routes.login} passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
        </Link>
        <Link href={routes.register} passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

GuestDrawer.propTypes = {
  children: PropTypes.node
}
