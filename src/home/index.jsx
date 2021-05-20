import React from 'react'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import TopTrending from './trending.component'
import Head from 'next/head'
import AppBarHome from './appbar.component'
import 'typeface-dancing-script'
import DrawerHome from './drawer.component'

export default function HomePage({ courses }) {
  return (
    <DrawerHome>
      <Head>
        <title>Urskyll - Sample Text</title>
      </Head>
      <AppBarHome />
      <Banner target="target" />
      <TopTrending courses={courses} />
    </DrawerHome>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
