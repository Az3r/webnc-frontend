import React from 'react'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import TopTrending from './trending.component'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import DrawerProvider from '@/features/home/drawer.component'
import DefaultLayout from '@/components/layout'

const AppBarProvider = dynamic(() => import('./appbar.component'))
export default function HomePage({ courses }) {
  return (
    <DrawerProvider>
      <Head>
        <title>Urskyll - Online Courses, Catch Up To Modern Technology</title>
      </Head>
      <DefaultLayout>
        <Banner target="target" />
        <AppBarProvider />
        <TopTrending courses={courses} />
      </DefaultLayout>
    </DrawerProvider>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
