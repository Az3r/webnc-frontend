import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './appbar.style'
import { name } from '@/utils/app'

export default function DashboardAppBar() {
  const styles = useStyles()

  return (
    <AppBar position="fixed" color="inherit" classes={{ root: styles.appbar }}>
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          className={styles.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={styles.title} variant="h5">
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
