import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch
} from '@material-ui/core'
import {
  Brightness3,
  BrightnessHigh,
  Create,
  ExitToApp,
  Favorite,
  Security,
  Shop,
  VideoLibrary
} from '@material-ui/icons'
import Link from 'next/link'
import { routes } from '@/utils/app'
import { useApp } from '@/app.theme'
import { useRouter } from 'next/router'
import { StudentPropTypes } from '@/utils/typing'
import NextImage from 'next/image'
import dynamic from 'next/dynamic'
import useStyles from './student.style'
import CategoryListItem from './category.listitem'
import { resources } from '@/utils/api'

const destinations = [
  { section: routes.u.library, icon: <VideoLibrary />, label: 'My Library' },
  { section: routes.u.watchlist, icon: <Favorite />, label: 'My Watchlist' },
  { section: routes.u.shop, icon: <Shop />, label: 'Shopping Cart' }
]

const SignoutDialog = dynamic(() => import('./signout.dialog'))
const ProfileDialog = dynamic(() => import('../dialog/profile.dialog'))

/**
 * @param {import('@material-ui/core').DrawerProps} props
 */
export default function StudentDrawer({ student, children, ...props }) {
  const router = useRouter()
  const { theme, setTheme } = useApp()
  const styles = useStyles()
  const { username, avatar, email } = student
  const [signoutDialog, setSignoutDialog] = useState(false)
  const [profileDialog, setProfileDialog] = useState(false)

  return (
    <Drawer {...props}>
      {children}
      <List subheader={<ListSubheader>Personal</ListSubheader>}>
        <ListItem>
          <ListItemAvatar>
            <NextImage
              src={avatar}
              alt={username}
              width={40}
              height={40}
              className={styles.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ className: styles.text }}
            primary={username}
            secondaryTypographyProps={{ className: styles.text }}
            secondary={email}
          />
        </ListItem>
        <ListItem button onClick={() => setProfileDialog(true)}>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary="Edit profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Security />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
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
        <CategoryListItem />
      </List>
      <Divider />
      <List subheader={<ListSubheader>Workspace</ListSubheader>}>
        {destinations.map((item) => (
          <Link href={item.section} key={item.section} passHref>
            <ListItem button component="a">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => setSignoutDialog(true)}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
      <SignoutDialog
        open={signoutDialog}
        onClose={() => setSignoutDialog(false)}
        onConfirm={() => {
          setSignoutDialog(false)
          router.push(routes.login)
          fetch(resources.auth.logout, { credentials: 'include' })
        }}
        onCancel={() => setSignoutDialog(false)}
      />
      <ProfileDialog
        fullWidth
        maxWidth="sm"
        student={student}
        open={profileDialog}
        onClose={() => setProfileDialog(false)}
        onConfirm={(user) => {
          alert(`email: ${user.email}\nusername: ${user.username}`)
          setProfileDialog(false)
        }}
        onCancel={() => setProfileDialog(false)}
      />
    </Drawer>
  )
}

StudentDrawer.propTypes = {
  children: PropTypes.node,
  student: StudentPropTypes.isRequired
}
