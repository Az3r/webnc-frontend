import React from 'react'
import PropTypes from 'prop-types'
import AppProvider from '@/app.theme'
import dynamic from 'next/dynamic'
import SearchProvider from '@/components/hooks/search.provider'
import AuthProvider from '@/components/hooks/auth.provider'
import { SnackbarProvider } from 'notistack'
import { Slide } from '@material-ui/core'
import DefaultLayout from '@/components/layout'
import { analytics } from '@/utils/firebase'
import '@/app.css'

const PageLoading = dynamic(() => import('@/components/page-loading'))
export default function MainApp({ Component, pageProps }) {
  return (
    <AppProvider>
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
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </SnackbarProvider>
      </SearchProvider>
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
  const { name, ...props } = metric
  analytics.logEvent(name, props)
}
