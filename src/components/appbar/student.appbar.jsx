import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Hidden,
  IconButton,
  InputBase,
  Typography
} from '@material-ui/core'
import { appname, routes } from '@/utils/app'
import NextImage from 'next/image'
import NextLink from 'next/link'
import useStyles from './student.style'
import {
  Brightness4,
  Close,
  Favorite,
  Menu,
  Search,
  Shop
} from '@material-ui/icons'
import dynamic from 'next/dynamic'
import { StudentPropTypes } from '@/utils/typing'

const StudentDrawer = dynamic(() =>
  import('@/components/drawer/student.drawer')
)

export default function StudentAppBar({ student }) {
  const styles = useStyles()

  const { username, avatar } = student

  const [drawer, setDrawer] = useState(false)

  return (
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
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <InputBase
            onFocus={(e) => e.target.select()}
            name="search"
            fullWidth
            placeholder="Search anything"
            endAdornment={
              <IconButton type="submit" color="inherit">
                <Search color="inherit" />
              </IconButton>
            }
          />
        </form>
      </Hidden>
      <Box justifyContent="flex-end" flexGrow={1} className={styles.actions}>
        <Hidden implementation="css" smUp>
          <IconButton>
            <Search />
          </IconButton>
        </Hidden>
        <Hidden implementation="css" smDown>
          <IconButton>
            <Brightness4 />
          </IconButton>
        </Hidden>
        <Hidden implementation="css" xsDown>
          <IconButton>
            <Shop />
          </IconButton>
        </Hidden>
        <Hidden implementation="css" xsDown>
          <IconButton>
            <Favorite />
          </IconButton>
        </Hidden>
        <Hidden implementation="css" smDown>
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
