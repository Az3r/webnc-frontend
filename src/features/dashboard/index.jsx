import React from 'react'
import { Box } from '@material-ui/core'
import DashboardDrawer from './drawer.component'
import DashboardAppBar from './appbar.component'
import DashboardProvider from './dashboard.context'
import DashboardContent from './content.component'

export default function Dashboard({ user }) {
  return (
    <DashboardProvider>
      <Box display="flex">
        <DashboardAppBar />
        <DashboardDrawer />
        <DashboardContent />
      </Box>
    </DashboardProvider>
  )
}
