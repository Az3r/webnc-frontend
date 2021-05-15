import React from 'react'
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
import useStyles from './home.style'
import {
  PrimaryButton,
  ExploreButton,
  SignUpButton
} from '@/home/home.component'

const goals = [
  'Watch and learn at your own speed',
  'Large collection of courses which suite your need',
  'Top instructors from around the world'
]

export default function HomePage() {
  const styles = useStyles()
  return (
    <>
      <Box className={styles.background} zIndex="-1" />
      <Container className={styles.root}>
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
          <Typography align="center" variant="h1" className={styles.title}>
            Urskyll
          </Typography>
        </Box>
        <Box paddingTop={8} display="flex" justifyContent="space-between">
          <Box>
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
        </Box>
      </Container>
    </>
  )
}
