import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { light } from '@/app.theme'
import '@/app.css'

export default function MainApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MainApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object
}

MainApp.defaultProps = {
  Component: <div />,
  pageProps: {}
}
