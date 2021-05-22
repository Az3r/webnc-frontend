import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'
import Link from 'next/link'
import { FiberManualRecord, Menu } from '@material-ui/icons'
import { config, useSpring } from '@react-spring/core'
import useStyles, {
  PrimaryButton,
  SignUpButton,
  ExploreButton
} from './banner.style'
import { animated } from '@react-spring/web'
import { useDrawer } from './drawer.component'
import { routes } from '@/utils/app'

const goals = [
  'Watch and learn at your own speed',
  'Large collection of courses which suite your need',
  'Top instructors from around the world'
]

const AnimatedBox = animated(Box)

export default function Banner({ target }) {
  const styles = useStyles()

  const spring = useSpring({
    to: { opacity: 1, translateY: 0 },
    from: { opacity: 0, translateY: 64 },
    delay: 600,
    config: config.molasses
  })

  const { toggle } = useDrawer()

  function explore() {}

  return (
    <Box className={styles.root} paddingTop={1}>
      <Container>
        <Box display="flex" justifyContent="flex-end">
          <Hidden xsDown>
            <Box width="160px">
              <Link href={routes.register}>
                <PrimaryButton variant="text" fullWidth>
                  Sign up
                </PrimaryButton>
              </Link>
            </Box>
            <Box width="160px">
              <Link href={routes.login}>
                <PrimaryButton variant="outlined" fullWidth>
                  Login
                </PrimaryButton>
              </Link>
            </Box>
          </Hidden>
          <Hidden smUp>
            <img src="/images/logo_icon.webp" width="64px" height="64px" />
            <Box flexGrow={1} />
            <IconButton data-cy="drawer-icon" onClick={() => toggle(true)}>
              <Menu style={{ color: 'white' }} />
            </IconButton>
          </Hidden>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Hidden xsDown>
            <img src="/images/logo_icon.webp" width="100px" height="100px" />
          </Hidden>
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
          paddingTop={4}
          display="flex"
          justifyContent="space-around"
        >
          <Box width="500px">
            <Typography variant="h4">
              A platform where you can learn and grow with technologies
            </Typography>
            <List component="ul" aria-label="contacts">
              {goals.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <FiberManualRecord style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" style={{ fontWeight: '400' }}>
                        {item}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box display="flex">
              <Box width="140px">
                <ExploreButton fullWidth onClick={explore}>
                  Explore
                </ExploreButton>
              </Box>
              <Box width="140px" marginLeft={2}>
                <Link href={routes.register}>
                  <SignUpButton fullWidth>Sign up</SignUpButton>
                </Link>
              </Box>
            </Box>
          </Box>
          <Hidden smDown>
            <img
              data-cy="banner-image"
              src="images/banner.webp"
              width="500px"
            />
          </Hidden>
        </AnimatedBox>
      </Container>
    </Box>
  )
}

Banner.propTypes = {
  target: PropTypes.string
}

Banner.defaultProps = {
  target: ''
}
