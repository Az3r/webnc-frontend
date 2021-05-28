import React from 'react'
import Dashboard from '@/features/dashboard'
import { name } from '@/utils/app'
import Head from 'next/head'

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | {name}</title>
      </Head>
      <Dashboard />
    </>
  )
}
