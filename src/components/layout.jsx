import React from 'react'
import PropTypes from 'prop-types'
import MainAppBar from './appbar'

export default function DefaultLayout({ children = <></> }) {
  return (
    <>
      <MainAppBar />
      <main>{children}</main>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node
}
