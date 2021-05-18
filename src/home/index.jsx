import React from 'react'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import TopTrending from '@/home/trending.component'
import { Box } from '@material-ui/core'
import { Element } from 'react-scroll'

export default function HomePage({ courses }) {
  return (
    <>
      <Banner target="target" />
      <Box padding={2}>
        <TopTrending courses={courses} />
      </Box>
    </>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
