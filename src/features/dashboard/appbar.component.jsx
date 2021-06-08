import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './appbar.style'
import { name } from '@/utils/app'
import { useDashboard } from './dashboard.context'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { Close } from '@material-ui/icons'

const AnimatedIconButton = animated(IconButton)
export default function DashboardAppBar() {
  const styles = useStyles()
  const { drawer, toggle } = useDashboard()
  const spring = useSpring({ rotate: drawer ? 360 : 0 })

  return (
    <AppBar position="fixed" color="inherit" classes={{ root: styles.appbar }}>
      <Toolbar className={styles.toolbar}>
        <AnimatedIconButton
          edge="start"
          className={styles.menuButton}
          style={spring}
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggle((prev) => !prev)}
        >
          {drawer ? <Close /> : <MenuIcon />}
        </AnimatedIconButton>
        <Typography className={styles.title} variant="h5">
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
