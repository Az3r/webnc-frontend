import React from 'react'
import AuthPage from '@/features/auth'
import Head from 'next/head'
import { name } from '@/utils/app'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | {name}</title>
      </Head>
      <AuthPage type="register" />
    </>
  )
}
