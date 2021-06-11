import React, { useState } from 'react'
import useStyles from './appbar.style'
import { appname } from '@/utils/app'
import { useDashboard } from './dashboard.context'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { Close, Search, Menu, Shop } from '@material-ui/icons'
import {
  Hidden,
  InputBase,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
  Popover,
  useTheme,
  ListItemText,
  ListItem
} from '@material-ui/core'
import CategoryPopover from './category.popover'

const AnimatedIconButton = animated(IconButton)
export default function DashboardAppBar() {
  const styles = useStyles()
  const theme = useTheme()
  const { drawer, toggle, search } = useDashboard()
  const spring = useSpring({ rotate: drawer ? 360 : 0 })

  const [popup, show] = useState(false)

  function submit(e) {
    e.preventDefault()

    const form = new FormData(e.target)
    const keyword = form.get('search')
    if (keyword) search(keyword)
  }

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        classes={{ root: styles.appbar }}
      >
        <Toolbar>
          <AnimatedIconButton
            edge="start"
            style={spring}
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggle((prev) => !prev)}
          >
            {drawer ? <Close /> : <Menu />}
          </AnimatedIconButton>
          <Hidden xsDown implementation="css">
            <Typography className={styles.title} variant="h5">
              {appname}
            </Typography>
          </Hidden>
          <ListItem
            aria-owns={popup ? 'popover-category' : undefined}
            aria-haspopup="true"
            classes={{ root: styles.listitem }}
            button
            selected={popup}
            onClick={() => show(true)}
          >
            <ListItemText primary="Categories" />
          </ListItem>
          <form className={styles.form} onSubmit={submit}>
            <InputBase
              className={styles.search}
              name="search"
              fullWidth
              placeholder="Search anything"
              endAdornment={
                <IconButton type="submit" color="inherit">
                  <Search />
                </IconButton>
              }
            />
            <Hidden xsDown implementation="css">
              <Box paddingLeft={1} display="flex">
                <IconButton>
                  <Shop />
                </IconButton>
              </Box>
            </Hidden>
          </form>
        </Toolbar>
      </AppBar>
      <Popover
        id="popover-category"
        disableRestoreFocus
        elevation={4}
        anchorReference="anchorPosition"
        anchorPosition={{
          left: 0,
          top: theme.mixins.toolbar.minHeight + theme.spacing(1)
        }}
        open={popup}
        onClose={() => show(false)}
      >
        <CategoryPopover />
      </Popover>
    </>
  )
}
