import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import Link from 'next/link'
import { ArrowDownward, FiberManualRecord, Menu } from '@material-ui/icons'
import { animated } from '@react-spring/web'
import { config, useSpring } from '@react-spring/core'
import useStyles, { ExploreButton } from './banner.style'
import { useDrawer } from './drawer.context'
import { routes } from '@/utils/app'

const goals = [
  'Watch and learn at your own speed',
  'Large collection of courses which suite your need',
  'Top instructors from around the world'
]

const AnimatedBox = animated(Box)

export default function Banner({ target }) {
  const styles = useStyles()
  const theme = useTheme()
  const xsdown = useMediaQuery(theme.breakpoints.down('xs'))

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
          {xsdown ? (
            <>
              <img src="/images/logo_icon.webp" width="64px" height="64px" />
              <Box flexGrow={1} />
              <IconButton data-cy="drawer-icon" onClick={() => toggle(true)}>
                <Menu style={{ color: 'white' }} />
              </IconButton>
            </>
          ) : (
            <>
              <Link href={routes.register} passHref>
                <Button className={styles.button}>Sign up</Button>
              </Link>
              <Link href={routes.login} passHref>
                <Button variant="outlined" className={styles.button}>
                  Login
                </Button>
              </Link>
            </>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {!xsdown && (
            <img src="/images/logo_icon.webp" width="100px" height="100px" />
          )}
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
              <Box width="160px">
                <ExploreButton
                  className={styles.button}
                  fullWidth
                  onClick={explore}
                  endIcon={<ArrowDownward />}
                >
                  Explore
                </ExploreButton>
              </Box>
            </Box>
          </Box>
          <Hidden smDown implementation="css">
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
