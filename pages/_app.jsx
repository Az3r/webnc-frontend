import React from 'react'
import PropTypes from 'prop-types'
import '@/app.css'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { light } from '@/app.theme'

function MainApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MainApp

MainApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object
}

MainApp.defaultProps = {
  Component: <div />,
  pageProps: {}
}
