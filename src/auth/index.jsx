import PropTypes from 'prop-types'
import React, { useState, useContext, useRef, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core'
import useStyles from './auth.style'
import { ArrowBack, Send } from '@material-ui/icons'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import RegisterContext from './auth.context'
import Login from './login.component'
import Register from './register.component'

const AnimatedBox = animated(Box)
const AnimatedIconButton = animated(IconButton)
export default function AuthPage({ type }) {
  const styles = useStyles()
  const [form, update] = useState({ email: '', username: '', password: '' })
  const [step, setStep] = useState(0)
  const card = useRef({ offsetWidth: 0 })
  const spring = useSpring({ step })

  useEffect(() => {
    setStep(type === 'register' ? 1 : 0)
  }, [])

  return (
    <RegisterContext.Provider
      value={{
        next: () => setStep(1),
        previous: () => setStep(0),
        form,
        update
      }}
    >
      <div className={styles.root}>
        <Card ref={card} className={styles.card}>
          <AnimatedIconButton
            onClick={() => setStep(0)}
            style={{
              rotate: spring.step.to((value) => value * 360),
              scale: spring.step
            }}
          >
            <ArrowBack />
          </AnimatedIconButton>
          <div style={{ width: '144px', height: '144px', margin: 'auto' }}>
            <img src="images/logo.webp" width="144px" height="144px" />
          </div>
          <Box flexGrow={1} display="flex" overflow="hidden">
            <AnimatedBox
              className={styles.step}
              style={{
                x: spring.step.to((value) => -value * card.current.offsetWidth)
              }}
            >
              <Login />
            </AnimatedBox>
            <AnimatedBox
              className={styles.step}
              style={{
                x: spring.step.to((value) => -value * card.current.offsetWidth)
              }}
            >
              <Register />
            </AnimatedBox>
          </Box>
        </Card>
      </div>
    </RegisterContext.Provider>
  )
}

function VerifyStep() {
  const {
    form: { email }
  } = useContext(RegisterContext)

  const styles = useStyles()
  const [cooldown, setCooldown] = useState(0)
  const [ready, resend] = useState(true)

  React.useEffect(() => {
    if (ready) return () => {}
    const timer = setInterval(() => {
      return setCooldown((prev) => {
        if (prev - 1 <= 0) resend(true)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [ready])

  function send() {
    setCooldown(60)
    resend(false)
  }

  return (
    <>
      <Typography align="center" variant="h4">
        Verify
      </Typography>
      <TextField
        className={styles.input}
        helperText={cooldown > 0 && `Please wait for ${cooldown} seconds...`}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={send} disabled={!ready}>
                <Send />
              </IconButton>
            </InputAdornment>
          )
        }}
        label="Email"
        value={email}
        type="email"
      />
      <Button
        className={styles.input}
        type="submit"
        variant="contained"
        color="primary"
      >
        Register
      </Button>
    </>
  )
}

AuthPage.propTypes = {
  type: PropTypes.string
}
AuthPage.defaultProps = {
  type: 'login'
}
