import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { light } from '@/app.theme'
import dynamic from 'next/dynamic'
import SnackBarProvider from '@/components/snackbar'
import '@/app.css'

const DynamicPageLoading = dynamic(() => import('@/components/page-loading'))
export default function MainApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <DynamicPageLoading />
      <SnackBarProvider>
        <Component {...pageProps} />
      </SnackBarProvider>
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
