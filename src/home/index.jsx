import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Box,
  Button,
  Fab,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import Banner from './banner.component'
import TopTrending from './trending.component'
import Head from 'next/head'

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
    setHeight((2 * window.innerHeight) / 3)
  }, [])
  const trigger = useScrollTrigger({
    threshold: height,
    disableHysteresis: true
  })
  return (
    <Zoom in={trigger}>
      <Box position="fixed" bottom="0" right="0" margin={1}>
        <Fab>
          <Menu />
        </Fab>
      </Box>
    </Zoom>
  )
}

function ShowAppBarOnSrollDown() {
  const [height, setHeight] = React.useState(300)
  React.useEffect(() => {
    setHeight((2 * window.innerHeight) / 3)
  }, [])
  const trigger = useScrollTrigger({
    threshold: height,
    disableHysteresis: true
  })
  return (
    <Slide in={trigger}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
