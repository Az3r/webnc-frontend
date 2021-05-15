import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'
import { FiberManualRecord } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import useStyles, {
  PrimaryButton,
  SignUpButton,
  ExploreButton
} from './banner.style'
import { animateScroll as scroller } from 'react-scroll'
import { animated } from '@react-spring/web'

const goals = [
  'Watch and learn at your own speed',
  'Large collection of courses which suite your need',
  'Top instructors from around the world'
]

const AnimatedBox = animated(Box)

export default function Banner({ scrollElementId }) {
  const spring = useSpring({
    to: { opacity: 1, translateY: 0 },
    from: { opacity: 0, translateY: 64 },
    delay: 600,
    config: config.molasses
  })
  const styles = useStyles()

  function explore() {
    console.log('scroll')
    if (scrollElementId) scroller.scrollTo(scrollElementId)
  }

  return (
    <Box className={styles.banner}>
      <Container>
        <Box display="flex" flexDirection="row-reverse">
          <Box width="160px">
            <PrimaryButton variant="outlined" fullWidth>
              Sign up
            </PrimaryButton>
          </Box>
          <Box width="160px">
            <PrimaryButton variant="text" fullWidth>
              Login
            </PrimaryButton>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img src="/images/logo_icon.webp" width="100" height="100" />
          <Typography
            align="center"
            variant="h1"
            className={styles['banner-title']}
          >
            Urskyll
          </Typography>
        </Box>
        <AnimatedBox
          style={spring}
          paddingTop={6}
          display="flex"
          justifyContent="space-between"
        >
          <Box>
            <Box width="500px">
              <Typography variant="h4" className={styles['banner-message']}>
                A platform where you can learn and grow with technologies
              </Typography>
              <List component="ul" aria-label="contacts">
                {goals.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FiberManualRecord style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="h6">{item}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
              <Box display="flex">
                <Box width="160px">
                  <ExploreButton fullWidth onClick={explore}>
                    Explore
                  </ExploreButton>
                </Box>
                <Box width="160px" marginLeft={2}>
                  <SignUpButton fullWidth>Sign up</SignUpButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <img src="images/banner.webp" width="500px" />
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  )
}

Banner.propTypes = {
  scrollElementId: PropTypes.string
}

Banner.defaultProps = {
  scrollElementId: ''
}
