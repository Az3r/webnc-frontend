import React from 'react'
import {
  Button,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles
} from '@material-ui/core'
import { FiberManualRecord } from '@material-ui/icons'
import useStyles from './banner.style'
import { config, useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'

const goals = [
  'Watch and learn at your own speed',
  'Large collection of courses which suite your need',
  'Top instructors from around the world'
]

export default function Banner() {
  const props = useSpring({
    to: { opacity: 1, translateY: 0 },
    from: { opacity: 0, translateY: 64 },
    delay: 600,
    config: config.molasses
  })
  const styles = useStyles()
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
          <img src="/images/logo_icon.png" width="100" height="100" />
          <Typography
            align="center"
            variant="h1"
            className={styles['banner-title']}
          >
            Urskyll
          </Typography>
        </Box>
        <AnimatedBox
          style={props}
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
                  <ExploreButton fullWidth>Explore</ExploreButton>
                </Box>
                <Box width="160px" marginLeft={2}>
                  <SignUpButton fullWidth>Sign up</SignUpButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <img src="images/banner-recruitment.png" width="500px" />
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  )
}

const PrimaryButton = withStyles({
  root: {
    color: 'white',
    background: 'transparent',
    letterSpacing: 1.25,
    '&:hover': {
      background: 'rgb(255,255,255,0.1)'
    }
  },
  outlined: {
    border: '1px solid rgb(255,255,255,0.5)'
  }
})(Button)

const ExploreButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #F0AD00, #FA7334)',
    '&:hover': {
      background: 'linear-gradient(45deg, #F0AD00, #FA7334)'
    }
  }
})(PrimaryButton)

const SignUpButton = withStyles({
  root: {
    background: '#005cb2'
  }
})(PrimaryButton)

const AnimatedBox = animated(Box)
