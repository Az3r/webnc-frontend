import React from 'react'
import {
  Avatar,
  Box,
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
  Typography
} from '@material-ui/core'
import {
  Brightness4,
  Close,
  Create,
  ExitToApp,
  Favorite,
  History,
  Shop,
  WatchLater
} from '@material-ui/icons'
import useStyles from './drawer.styles'
import { name } from '@/utils/app'
import { useApp } from '@/app.theme'
import { useDashboard } from './dashboard.context'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'

const DrawerContext = React.createContext({})
export default function DashboardDrawer() {
  const { drawer } = useDashboard()
  const { theme, setTheme } = useApp()
  const styles = useStyles()
  const spring = useSpring({ width: drawer ? 283.4 : 0 })

  return (
    <animated.nav className={styles.drawer} style={spring}>
      <Drawer open={drawer} variant="persistent" anchor="left">
        <Box display="flex" alignItems="center" paddingLeft={2}>
          <Typography style={{ fontFamily: 'Dancing Script' }} variant="h4">
            {name}
          </Typography>
          <Box flexGrow="1" />
          <IconButton>
            <Close />
          </IconButton>
        </Box>
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
          <ListItem button>
            <ListItemIcon>
              <WatchLater />
            </ListItemIcon>
            <ListItemText primary="Watchlist" />
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
          <ListItem button>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="History" />
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
    </animated.nav>
  )
}

export function useDrawer() {
  return React.useContext(DrawerContext)
}
