import React from 'react'
import PropTypes from 'prop-types'
import MainAppBar from './appbar'
import { Box, Divider } from '@material-ui/core'

export default function DefaultLayout({ children = <></> }) {
  return (
    <>
      <MainAppBar />
      <main>{children}</main>
      <Box paddingTop={8} paddingBottom={2}>
        <Divider />
      </Box>
      <footer>
        <Box minHeight="10vh" />
      </footer>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node
}
