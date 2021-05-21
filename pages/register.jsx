import React from 'react'
import AuthPage from '@/auth'
import Head from 'next/head'
import { name } from '@/utils/app'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>{name} | Register</title>
      </Head>
      <AuthPage type="register" />
    </>
  )
}
