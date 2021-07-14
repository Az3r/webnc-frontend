import React, { useState } from 'react'
import {
  Box,
  Grow,
  Button,
  Hidden,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Tooltip
} from '@material-ui/core'
import { appname, routes } from '@/utils/app'
import NextImage from 'next/image'
import NextLink from 'next/link'
import useStyles from './appbar.style'
import {
  Shop,
  Brightness3,
  BrightnessHigh,
  Close,
  Menu,
  Search,
  VideoLibrary,
  AccountBalance
} from '@material-ui/icons'
import dynamic from 'next/dynamic'
import { useApp } from '@/app.theme'
import InlineSearch from './search.component'
import { useAuth } from '../hooks/auth.provider'
import LecturerDrawer from '../drawer/lecturer.drawer'

const GuestDrawer = dynamic(() => import('@/components/drawer/guest.drawer'))
const StudentDrawer = dynamic(() =>
  import('@/components/drawer/student.drawer')
)
const CategoryPopover = dynamic(() => import('./category.popover'))

export default function GuestAppBar() {
  const styles = useStyles()
  const { setTheme, theme } = useApp()

  const { user } = useAuth()
  const [drawer, setDrawer] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)

  const guest = !user || user.role === 'Admin'
  const student = user?.role === 'Student'
  const lecturer = user?.role === 'Lecturer'

  function AppBarActions() {
    return (
      <>
        {guest && <GuestAction />}
        {student && <StudentAction />}
        {lecturer && <LecturerAction />}
      </>
    )
  }

  const AppBarDrawer = lecturer
    ? LecturerDrawer
    : student
    ? StudentDrawer
    : GuestDrawer

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={styles.root}>
          <Grow in={showCategory}>
            <Box
              style={{
                pointerEvents: showCategory ? 'all' : 'none',
                transformOrigin: '50% 0'
              }}
              className={styles.popover}
              onMouseEnter={() => setShowCategory(true)}
              onMouseLeave={() => setShowCategory(false)}
            >
              <CategoryPopover />
            </Box>
          </Grow>
          {mobileSearch ? (
            <>
              <IconButton onClick={() => setMobileSearch(false)}>
                <Close />
              </IconButton>
              <InlineSearch autoFocus />
            </>
          ) : (
            <>
              <NextLink href="/" passHref>
                <Box
                  component="a"
                  display="flex"
                  alignItems="center"
                  className={styles.brand}
                >
                  <NextImage
                    priority
                    title="app's logo"
                    src="/images/logo_icon.webp"
                    width={48}
                    height={48}
                  />
                  <Typography variant="h4" className={styles.title}>
                    {appname}
                  </Typography>
                </Box>
              </NextLink>
              <Box flexGrow={1} justifyContent="center">
                <Hidden implementation="css" smDown>
                  <Typography
                    variant="h6"
                    className={styles.category}
                    onTouchEnd={() => setShowCategory((prev) => !prev)}
                    onMouseEnter={() => setShowCategory(true)}
                    onMouseLeave={() => setShowCategory(false)}
                  >
                    Categories
                  </Typography>
                </Hidden>
              </Box>
              <Hidden xsDown>
                <InlineSearch />
              </Hidden>
              <Box justifyContent="flex-end" flexGrow={1}>
                <Hidden smUp>
                  <IconButton onClick={() => setMobileSearch(true)}>
                    <Search />
                  </IconButton>
                </Hidden>
                <Hidden xsDown>
                  <IconButton
                    onClick={() =>
                      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
                    }
                  >
                    {theme === 'dark' ? <Brightness3 /> : <BrightnessHigh />}
                  </IconButton>
                </Hidden>
                <Hidden implementation="css" smDown>
                  <AppBarActions />
                </Hidden>
                <IconButton onClick={() => setDrawer(true)}>
                  <Menu />
                </IconButton>
              </Box>
              <AppBarDrawer
                classes={{ paper: styles.drawer }}
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(false)}
              >
                <Box>
                  <IconButton onClick={() => setDrawer(false)}>
                    <Close />
                  </IconButton>
                </Box>
              </AppBarDrawer>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

function GuestAction() {
  return (
    <>
      <NextLink href={routes.login} passHref>
        <Button variant="text" color="inherit">
          sign in
        </Button>
      </NextLink>
      <NextLink href={routes.register} passHref>
        <Button variant="text" color="inherit">
          register
        </Button>
      </NextLink>
    </>
  )
}

function StudentAction() {
  return (
    <>
      <NextLink href={routes.u.shop} passHref>
        <Tooltip title="Go to Cart">
          <IconButton>
            <Shop />
          </IconButton>
        </Tooltip>
      </NextLink>
      <NextLink href={routes.u.library} passHref>
        <Tooltip title="Go to Library">
          <IconButton>
            <VideoLibrary />
          </IconButton>
        </Tooltip>
      </NextLink>
    </>
  )
}

function LecturerAction() {
  return (
    <>
      <NextLink href={routes.l.dashboard} passHref>
        <Tooltip title="Go to Own Courses">
          <IconButton>
            <AccountBalance />
          </IconButton>
        </Tooltip>
      </NextLink>
      <NextLink href={routes.u.library} passHref>
        <Tooltip title="Go to Library">
          <IconButton>
            <VideoLibrary />
          </IconButton>
        </Tooltip>
      </NextLink>
    </>
  )
}
