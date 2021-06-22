import React from 'react'
import PropTypes from 'prop-types'
import AppProvider from '@/app.theme'
import dynamic from 'next/dynamic'
import SnackBarProvider from '@/components/snackbar.provider'
import SearchProvider from '@/components/search.provider'
import 'typeface-dancing-script'
import '@/app.css'

const DynamicPageLoading = dynamic(() => import('@/components/page-loading'))
export default function MainApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <DynamicPageLoading />
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
      <SnackBarProvider />
    </AppProvider>
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
