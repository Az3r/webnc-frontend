import React from 'react'
import PropTypes from 'prop-types'
import MainAppBar from './appbar'
import { Box, Divider } from '@material-ui/core'

export default function DefaultLayout({ children = <></> }) {
  return (
    <>
      <MainAppBar />
      <Box component="main" minHeight="100vh" position="relative">
        {children}
      </Box>
      <Box paddingY={2}>
        <Divider />
      </Box>
      <Box component="footer"></Box>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node
}
