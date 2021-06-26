import React, { useState } from 'react'
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
import useStyles from './guest.style'
import { Brightness4, Close, Menu, Search } from '@material-ui/icons'
import dynamic from 'next/dynamic'

const GuestDrawer = dynamic(() => import('@/components/drawer/guest.drawer'))

export default function GuestAppBar() {
  const styles = useStyles()

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
      <Box justifyContent="flex-end" flexGrow={1}>
        <Hidden smUp>
          <IconButton>
            <Search />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          <IconButton>
            <Brightness4 />
          </IconButton>
        </Hidden>
        <Hidden implementation="css" smDown>
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
        </Hidden>
        <Hidden implementation="css" mdUp>
          <IconButton onClick={() => setDrawer(true)}>
            <Menu />
          </IconButton>
        </Hidden>
      </Box>
      <GuestDrawer
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
      </GuestDrawer>
    </>
  )
}
