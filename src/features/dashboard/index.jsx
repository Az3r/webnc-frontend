import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import useStyles from './dashboard.style'
import DashboardDrawer from './drawer.component'

export default function Dashboard({ user }) {
  const styles = useStyles()
  return (
    <main className={styles.root}>
      <DashboardDrawer />
      <Box flexGrow="1" bgcolor="#303030"></Box>
    </main>
  )
}
