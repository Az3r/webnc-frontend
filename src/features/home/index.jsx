import React from 'react'
import PropTypes from 'prop-types'
import TopTrending from './trending.component'
import Head from 'next/head'
import DefaultLayout from '@/components/layout'

export default function HomePage({ courses }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Urskyll - Online Courses, Catch Up To Modern Technology</title>
      </Head>
      <TopTrending courses={courses} />
    </DefaultLayout>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
