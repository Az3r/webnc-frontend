import React from 'react'
import AuthPage from '@/features/auth'
import Head from 'next/head'
import { appname } from '@/utils/app'
import { useRouter } from 'next/router'

export default function VerifyPage() {
  const router = useRouter()
  const { email } = router.query
  return (
    <>
      <Head>
        <title>Verify Your Account | {appname}</title>
      </Head>
      <AuthPage type="verify" email={email} />
    </>
  )
}
