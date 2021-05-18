import React from 'react'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import TopTrending from '@/home/trending.component'

export default function HomePage({ courses }) {
  return (
    <>
      <Banner scrollElementId="123" />
      <TopTrending courses={courses} />
    </>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
