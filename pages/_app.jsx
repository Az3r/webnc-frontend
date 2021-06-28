import React from 'react'
import PropTypes from 'prop-types'
import AppProvider from '@/app.theme'
import dynamic from 'next/dynamic'
import SearchProvider from '@/components/hooks/search.provider'
import '@/app.css'
import AuthProvider from '@/components/hooks/auth.provider'
import { SnackbarProvider } from 'notistack'
import { Slide } from '@material-ui/core'

const PageLoading = dynamic(() => import('@/components/page-loading'))
export default function MainApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <PageLoading />
        <SearchProvider>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            TransitionComponent={Slide}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </SearchProvider>
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
