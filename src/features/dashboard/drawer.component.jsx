import React, { useEffect } from 'react'
import {
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
  Typography,
  useMediaQuery
} from '@material-ui/core'
import {
  Brightness4,
  Close,
  Create,
  ExitToApp,
  Favorite,
  Home,
  Shop,
  VideoLibrary
} from '@material-ui/icons'
import useStyles from './drawer.styles'
import { appname } from '@/utils/app'
import { useApp } from '@/app.theme'
import { sections, useDashboard } from './dashboard.context'

const DrawerContext = React.createContext({})
export default function DashboardDrawer() {
  const { drawer, toggle, go } = useDashboard()
  const { theme, setTheme } = useApp()
  const styles = useStyles()
  const upMD = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <nav>
      <Drawer
        open={drawer}
        onClose={() => toggle(false)}
        variant={upMD ? 'persistent' : 'temporary'}
        anchor="left"
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
            <IconButton>
              <Close onClick={() => toggle(false)} />
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
          <ListItem button onClick={() => go(sections.home)}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => go(sections.search)}>
            <ListItemIcon>
              <VideoLibrary />
            </ListItemIcon>
            <ListItemText primary="My Courses" />
            <Typography className={styles.number} variant="caption">
              99+
            </Typography>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
            <ListItemSecondaryAction>
              <Typography className={styles.number} variant="caption">
                1
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Shop />
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
            <ListItemSecondaryAction>
              <Typography className={styles.number} variant="caption">
                1
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  )
}

export function useDrawer() {
  return React.useContext(DrawerContext)
}
