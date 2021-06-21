import React from 'react'
import AuthPage from '@/features/auth'
import Head from 'next/head'
import { appname } from '@/utils/app'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | {appname}</title>
      </Head>
      <AuthPage />
    </>
  )
}
