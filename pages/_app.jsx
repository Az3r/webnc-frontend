import React from 'react'
import PropTypes from 'prop-types'
import { StylesProvider, ThemeProvider } from '@material-ui/core'
import { generateClassName, light } from '@/app.theme'
import dynamic from 'next/dynamic'
import SnackBarProvider from '@/components/snackbar'
import '@/app.css'

const DynamicPageLoading = dynamic(() => import('@/components/page-loading'))
export default function MainApp({ Component, pageProps }) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={light}>
        <DynamicPageLoading />
        <SnackBarProvider>
          <Component {...pageProps} />
        </SnackBarProvider>
      </ThemeProvider>
    </StylesProvider>
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
