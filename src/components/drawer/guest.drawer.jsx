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
  Divider,
  Collapse,
  ListItemAvatar,
  makeStyles,
  IconButton,
  Tooltip
} from '@material-ui/core'
import {
  Brightness3,
  Brightness4,
  BrightnessHigh,
  Category,
  ExitToApp,
  Fullscreen,
  GroupAdd,
  KeyboardArrowDown,
  Launch
} from '@material-ui/icons'
import NextImage from 'next/image'
import { useApp } from '@/app.theme'
import Link from 'next/link'
import { routes } from '@/utils/app'
import StudentDrawer from './student.drawer'

const useStyles = makeStyles((theme) => ({
  avatar: {
    borderRadius: '50%'
  }
}))

/**
 * @param {import('@material-ui/core').DrawerProps} props
 */
export default function GuestDrawer({ children, ...props }) {
  const { theme, setTheme } = useApp()
  const styles = useStyles()
  const [nested, setNested] = React.useState(false)
  return (
    <>
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
              {theme === 'dark' ? <Brightness3 /> : <BrightnessHigh />}
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
          <ListItem>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            <ListItemSecondaryAction>
              <IconButton>
                <KeyboardArrowDown />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in>
            <Box paddingLeft={2}>
              <ListItem button onClick={() => setNested(true)}>
                <ListItemAvatar>
                  <NextImage
                    src="/images/category/web.webp"
                    alt="Web Development"
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary="Categories" />
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
              <ListItem button>
                <ListItemAvatar>
                  <NextImage
                    src="/images/category/mobile.webp"
                    alt="Mobile Development"
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary="Categories" />
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
      <Drawer open={nested} anchor="right" onClose={() => setNested(false)}>
        <ListItem button component="a">
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      </Drawer>
    </>
  )
}

GuestDrawer.propTypes = {
  children: PropTypes.node
}
