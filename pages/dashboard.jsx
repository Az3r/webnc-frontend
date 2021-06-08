import React from 'react'
import Dashboard from '@/features/dashboard'
import { appname } from '@/utils/app'
import Head from 'next/head'

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | {appname}</title>
      </Head>
      <Dashboard />
    </>
  )
}
