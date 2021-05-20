import React from 'react'
import PropTypes from 'prop-types'
import { Box, Fab, Slide, useScrollTrigger, Zoom } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import Banner from './banner.component'
import TopTrending from './trending.component'
import Head from 'next/head'
import AppBarHome from '@/home/appbar.component'
import 'typeface-dancing-script'

export default function HomePage({ courses }) {
  return (
    <>
      <Head>
        <title>Urskyll - Sample Text</title>
      </Head>
      <ShowAppBarOnSrollDown />
      <ShowFabOnScrollDown />
      <Banner target="target" />
      <TopTrending courses={courses} />
    </>
  )
}

function ShowFabOnScrollDown() {
  const [height, setHeight] = React.useState(300)
  React.useEffect(() => {
    setHeight((3 * window.innerHeight) / 5)
  }, [])
  const trigger = useScrollTrigger({
    threshold: height,
    disableHysteresis: true
  })
  return (
    <Zoom in={trigger}>
      <Box position="fixed" bottom="0" right="0" margin={2}>
        <Fab>
          <Search />
        </Fab>
      </Box>
    </Zoom>
  )
}

function ShowAppBarOnSrollDown() {
  const [height, setHeight] = React.useState(300)
  React.useEffect(() => {
    setHeight((3 * window.innerHeight) / 5)
  }, [])
  const trigger = useScrollTrigger({
    threshold: height,
    disableHysteresis: true
  })
  return (
    <Slide in={trigger}>
      <AppBarHome />
    </Slide>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
