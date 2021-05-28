import React from 'react'
import PropTypes from 'prop-types'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { dark, light } from '@/app.theme'
import dynamic from 'next/dynamic'
import SnackBarProvider from '@/components/snackbar'
import 'typeface-dancing-script'
import '@/app.css'

const DynamicPageLoading = dynamic(() => import('@/components/page-loading'))
export default function MainApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={dark}>
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
