import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { Box, Card, IconButton } from '@material-ui/core'
import style from './auth.style'
import { ArrowBack } from '@material-ui/icons'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import AuthContext from './auth.context'
import Login from './login.component'
import Register from './register.component'
import Link from 'next/link'
import VerifyEmail from './verify.component'

const AnimatedBox = animated(Box)
const AnimatedIconButton = animated(IconButton)
const TYPES = {
  login: 0,
  register: 1,
  verify: 2
}

function AuthPage({ type, classes }) {
  const [form, update] = useState({ email: '', username: '', password: '' })
  const [step, setStep] = useState(TYPES[type])
  const card = useRef(null)
  const [width, setWidth] = useState(400)
  const spring = useSpring({ step })

  useEffect(() => {
    setWidth(card.current.offsetWidth)
    window.addEventListener('resize', onScreenOrientationChanged)
    return () =>
      window.removeEventListener('resize', onScreenOrientationChanged)
  }, [])

  function onScreenOrientationChanged() {
    if (width !== card.current.offsetWidth) setWidth(card.current.offsetWidth)
  }

  return (
    <AuthContext.Provider
      value={{
        next: () => setStep((prev) => prev + 1),
        previous: () => setStep((prev) => prev - 1),
        form,
        update
      }}
    >
      <div className={classes.root}>
        <Card ref={card} className={classes.card}>
          <AnimatedIconButton
            onClick={() => setStep((prev) => prev - 1)}
            style={{
              rotate: spring.step.to((value) => Math.min(value * 360, 360)),
              scale: spring.step.to((value) => Math.min(value, 1))
            }}
          >
            <ArrowBack />
          </AnimatedIconButton>
          <Link href="/">
            <div
              style={{
                width: '144px',
                height: '144px',
                margin: 'auto',
                cursor: 'pointer'
              }}
            >
              <img src="images/logo.webp" width="144px" height="144px" />
            </div>
          </Link>
          <AnimatedBox
            flexGrow={1}
            display="flex"
            overflow="hidden"
            width="6000px"
            style={{
              x: spring.step.to((x) => x * -width)
            }}
          >
            <div className={classes.step} style={{ width }}>
              <Login classes={classes} />
            </div>
            <div className={classes.step} style={{ width }}>
              <Register classes={classes} />
            </div>
            <div className={classes.step} style={{ width }}>
              <VerifyEmail classes={classes} />
            </div>
          </AnimatedBox>
        </Card>
      </div>
    </AuthContext.Provider>
  )
}

export default style(AuthPage)

AuthPage.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.object.isRequired
}
AuthPage.defaultProps = {
  type: 'login'
}
