import DefaultLayout from '@/components/layout'
import { appname } from '@/utils/app'
import { Box, Typography } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>404 Page Not Found | {appname}</title>
      </Head>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src="/images/logo.webp" alt="App's logo" title={appname} />
        <Typography variant="h2">404 - Page Not Found</Typography>
      </Box>
    </DefaultLayout>
  )
}
