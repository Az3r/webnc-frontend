import React, { useState } from 'react'
import {
  Box,
  Button,
  Grow,
  Hidden,
  IconButton,
  Typography
} from '@material-ui/core'
import { appname } from '@/utils/app'
import NextImage from 'next/image'
import NextLink from 'next/link'
import useStyles from './student.style'
import {
  Brightness3,
  BrightnessHigh,
  Close,
  Favorite,
  Menu,
  Search,
  Shop
} from '@material-ui/icons'
import dynamic from 'next/dynamic'
import { StudentPropTypes } from '@/utils/typing'
import { useApp } from '@/app.theme'
import InlineSearch from './search.component'

const StudentDrawer = dynamic(() =>
  import('@/components/drawer/student.drawer')
)
const CategoryPopover = dynamic(() => import('./category.popover'))

export default function StudentAppBar({ student }) {
  const styles = useStyles()
  const { setTheme, theme } = useApp()
  const { username, avatar } = student

  const [drawer, setDrawer] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)

  return (
    <>
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
              <Button variant="text" color="inherit">
                categories
              </Button>
            </Hidden>
          </Box>
          <Hidden xsDown>
            <InlineSearch />
          </Hidden>
          <Box
            justifyContent="flex-end"
            flexGrow={1}
            className={styles.actions}
          >
            <Hidden implementation="css" smUp>
              <IconButton>
                <Search />
              </IconButton>
            </Hidden>
            <Hidden implementation="css" smDown>
              <IconButton
                onClick={() =>
                  setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
                }
              >
                {theme === 'dark' ? <Brightness3 /> : <BrightnessHigh />}
              </IconButton>
            </Hidden>
            <Hidden implementation="css" xsDown>
              <IconButton>
                <Shop />
              </IconButton>
              <IconButton>
                <Favorite />
              </IconButton>
              <NextImage
                width={40}
                height={40}
                alt={username}
                src={avatar}
                priority
                className={styles.avatar}
              />
            </Hidden>
            <Hidden implementation="css" mdUp>
              <IconButton onClick={() => setDrawer(true)}>
                <Menu />
              </IconButton>
            </Hidden>
          </Box>
          <StudentDrawer
            classes={{ paper: styles.drawer }}
            student={student}
            open={drawer}
            onClose={() => setDrawer(false)}
            anchor="right"
          >
            <Box>
              <IconButton onClick={() => setDrawer(false)}>
                <Close />
              </IconButton>
            </Box>
          </StudentDrawer>
        </>
      )}
    </>
  )
}

StudentAppBar.propTypes = {
  student: StudentPropTypes.isRequired
}

if (process.env.NEXT_PUBLIC_REACT_DEFAULT_PROPS)
  StudentAppBar.defaultProps = {
    student: {
      id: '60d016866f39c27a2447c63f',
      role: 'Admin',
      email: 'merritt@telepark.durban',
      avatar: 'https://picsum.photos/64.webp?random=1286',
      username: 'RobertLynn',
      passsword: 'magna'
    }
  }
