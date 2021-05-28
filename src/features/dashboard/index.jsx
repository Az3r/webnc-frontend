import React from 'react'
import useStyles from './dashboard.style'
import DashboardDrawer from './drawer.component'
import DashboardAppBar from './appbar.component'

export default function Dashboard({ user }) {
  const styles = useStyles()
  return (
    <main className={styles.root}>
      <DashboardAppBar />
      <DashboardDrawer />
    </main>
  )
}
