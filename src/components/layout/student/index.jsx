import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import StudentAppBar from './appbar.component'
import StudentDrawer from './drawer.component'
import StudentContent from './content.component'
import LayoutProvider from './student.context'

export default function StudentLayout({ children = <></> }) {
  return (
    <LayoutProvider>
      <Box display="flex">
        <StudentAppBar />
        <StudentDrawer />
        <StudentContent>{children}</StudentContent>
      </Box>
    </LayoutProvider>
  )
}

StudentLayout.propTypes = {
  children: PropTypes.node
}
