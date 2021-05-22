import React from 'react'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import TopTrending from './trending.component'
import Head from 'next/head'
import 'typeface-dancing-script'
import dynamic from 'next/dynamic'

const DynamicAppBar = dynamic(() => import('./appbar.component'))
const DynamicDrawer = dynamic(() => import('./drawer.component'))
export default function HomePage({ courses }) {
  return (
    <DynamicDrawer>
      <Head>
        <title>Urskyll - Sample Text</title>
      </Head>
      <DynamicAppBar />
      <Banner target="target" />
      <TopTrending courses={courses} />
    </DynamicDrawer>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
