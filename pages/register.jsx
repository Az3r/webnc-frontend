import React from 'react'
import AuthPage from '@/features/auth'
import Head from 'next/head'
import { appname } from '@/utils/app'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | {appname}</title>
      </Head>
      <AuthPage type="register" />
    </>
  )
}
