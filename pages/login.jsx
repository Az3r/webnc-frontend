import React from 'react'
import AuthPage from '@/features/auth'
import Head from 'next/head'
import { name } from '@/utils/app'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | {name}</title>
      </Head>
      <AuthPage />
    </>
  )
}
