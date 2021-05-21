import React from 'react'
import AuthPage from '@/auth'
import Head from 'next/head'
import { name } from '@/utils/app'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>{name} | Login</title>
      </Head>
      <AuthPage />
    </>
  )
}
