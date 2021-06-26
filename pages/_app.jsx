import React from 'react'
import PropTypes from 'prop-types'
import AppProvider from '@/app.theme'
import dynamic from 'next/dynamic'
import SearchProvider from '@/components/search.provider'
import '@/app.css'
import AuthProvider from '@/components/auth.provider'

const DynamicPageLoading = dynamic(() => import('@/components/page-loading'))
const DynamicSnackBar = dynamic(() => import('@/components/snackbar.provider'))
export default function MainApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <DynamicPageLoading />
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
        <DynamicSnackBar />
      </AuthProvider>
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

export function reportWebVitals(metric) {
  console.log(metric)
}
