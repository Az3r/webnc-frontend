import React from 'react'
import DashboardDrawer from './drawer.component'
import DashboardAppBar from './appbar.component'
import DashboardProvider from './dashboard.context'
import { Box } from '@material-ui/core'
import DashboardContent from './content.component'

export default function Dashboard({ user }) {
  return (
    <DashboardProvider>
      <DashboardAppBar />
      <Box display="flex">
        <DashboardDrawer />
        <DashboardContent />
      </Box>
    </DashboardProvider>
  )
}
