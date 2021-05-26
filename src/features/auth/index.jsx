import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { Box, Card, IconButton } from '@material-ui/core'
import useStyles from './auth.style'
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
export default function AuthPage({ type }) {
  const styles = useStyles()
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
      <div className={styles.root}>
        <Card ref={card} className={styles.card}>
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
            <div className={styles.step} style={{ width }}>
              <Login />
            </div>
            <div className={styles.step} style={{ width }}>
              <Register />
            </div>
            <div className={styles.step} style={{ width }}>
              <VerifyEmail />
            </div>
          </AnimatedBox>
        </Card>
      </div>
    </AuthContext.Provider>
  )
}

AuthPage.propTypes = {
  type: PropTypes.string
}
AuthPage.defaultProps = {
  type: 'login'
}
