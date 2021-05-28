import React from 'react'
import {
  Avatar,
  Box,
  CardHeader,
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
  Inbox,
  Mail,
  Shop,
  WatchLater
} from '@material-ui/icons'
import useStyles from './drawer.styles'

const DrawerContext = React.createContext({})
export default function DashboardDrawer() {
  const styles = useStyles()
  return (
    <nav>
      <DrawerContext.Provider>
        <Drawer
          open={true}
          variant="persistent"
          className={styles.root}
          classes={{ paper: styles.root }}
        >
          <Box marginLeft="auto">
            <IconButton>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <List subheader={<ListSubheader>Personal</ListSubheader>}>
            <ListItem>
              <ListItemAvatar
                title="User's Name"
                subheader="proplaydota12345@gmail.com"
              >
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
                <Switch edge="end" />
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
      </DrawerContext.Provider>
    </nav>
  )
}

export function useDrawer() {
  return React.useContext(DrawerContext)
}
