import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
  useMediaQuery
} from '@material-ui/core'
import {
  Brightness4,
  Close,
  Create,
  ExitToApp,
  Favorite,
  Home,
  Search,
  Shop,
  VideoLibrary
} from '@material-ui/icons'
import { appname, routes } from '@/utils/app'
import { useApp } from '@/app.theme'
import { useStudent } from './student.context'
import { useRouter } from 'next/router'

const destinations = [
  { section: routes.u.explore, icon: <Home />, label: 'Explore' },
  { section: routes.u.course, icon: <VideoLibrary />, label: 'My Courses' },
  { section: '/', icon: <Favorite />, label: 'Favorites' },
  { section: '/', icon: <Shop />, label: 'Shopping Cart' },
  { section: '/', icon: <Search />, label: 'Search' }
]

export default function StudentDrawer() {
  const router = useRouter()
  const { drawer, toggle, go, section } = useStudent()
  const { theme, setTheme } = useApp()
  const [showSignOutDialog, alertSignOut] = useState(false)
  const upMD = useMediaQuery((theme) => theme.breakpoints.up('md'))

  function signout() {
    router.push(routes.login)
  }

  return (
    <nav>
      <Drawer
        open={drawer}
        onClose={() => toggle(false)}
        variant={upMD ? 'persistent' : 'temporary'}
      >
        <ListItem>
          <ListItemText
            primary={appname}
            primaryTypographyProps={{
              variant: 'h4',
              style: { fontFamily: 'Dancing Script' }
            }}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => toggle(false)}>
              <Close />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <List subheader={<ListSubheader>Personal</ListSubheader>}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="https://picsum.photos/64" />
            </ListItemAvatar>
            <ListItemText
              primary="User's Name"
              secondary="proplaydota12345@gmail.com"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText primary="Edit profile" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Brightness4 />
            </ListItemIcon>
            <ListItemText primary="Dark Theme" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader>Workspace</ListSubheader>}>
          {destinations.map((item) => (
            <ListItem
              key={item.section}
              selected={item.section === section}
              button
              onClick={() => go(item.section)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => alertSignOut(true)}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Drawer>
      <Dialog
        open={showSignOutDialog}
        onClose={() => alertSignOut(false)}
        aria-labelledby="alert-dialog-signout"
        aria-describedby="sign user out"
      >
        <DialogTitle id="alert-dialog-signout">
          {'You are about to sign out?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => alertSignOut(false)} color="primary">
            Dismiss
          </Button>
          <Button onClick={signout} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  )
}
