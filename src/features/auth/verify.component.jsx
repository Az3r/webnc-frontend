import React, { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AuthContext from './auth.context'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core'
import { CancelScheduleSend, Send } from '@material-ui/icons'
import { parse } from '@/utils/errors'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

const WELCOME =
  "An OPT code has been sent to your email address, if you don't recieve one, you can click on the send button to the right"
const INPUTS = [0, 1, 2, 3, 4, 5]
export default function VerifyEmail({ classes }) {
  const { form } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()

  const router = useRouter()
  const [cooldown, setCooldown] = useState(0)
  const [ready, resend] = useState(true)
  const [first, setFirst] = useState(true)
  const [otp, update] = useState(INPUTS.map(() => 0))
  const [processing, process] = useState(false)

  const inputs = INPUTS.map(() => useRef(null))
  const submitEl = useRef(null)

  React.useEffect(() => {
    // countdown timer
    if (ready) return () => {}
    const timer = setInterval(() => {
      return setCooldown((prev) => {
        if (prev - 1 <= 0) resend(true)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [ready])

  async function send() {
    if (ready) {
      if (first) setFirst(false)
      setCooldown(30)
      resend(false)

      const api = await import('./auth.api')
      api.resend(form.email)
    }
  }

  function onType(s, index) {
    const matches = s.match(/([0-9])/)
    if (matches) {
      const digit = matches[0]
      update((prev) =>
        prev.map((d, i) => {
          if (index === i) return digit
          return d
        })
      )
      if (index + 1 >= INPUTS.length) submitEl.current.focus()
      else inputs[index + 1].current.focus()
    }
  }

  async function verify() {
    process(true)
    try {
      const api = await import('./auth.api')
      await api.verify({
        email: form.email,
        code: otp.join('')
      })

      router.push('/')
      enqueueSnackbar('Account verified', { variant: 'success' })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      process(false)
    }
  }

  const wait =
    cooldown > 0
      ? `Please wait for ${cooldown} seconds before you can resend another one`
      : undefined

  return (
    <div className={classes.form}>
      <TextField
        tabIndex="-1"
        name="email"
        type="email"
        aria-label="email"
        helperText={wait}
        error={!ready}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title={ready ? 'Send OTP code' : "You can't do this now"}
                placement="top"
              >
                <IconButton
                  tabIndex="-1"
                  edge="end"
                  aria-label="send otp code"
                  onClick={send}
                >
                  {ready ? <Send /> : <CancelScheduleSend />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
        label="Email"
        value={form.email || ''}
      />
      <Box paddingY={2}>
        <Typography color="textSecondary" variant="caption">
          An OPT code has been sent to your email address, you should also check
          in spam or junk mail folder if you don&apos;t recieve one, you can
          click on the send button to the right
        </Typography>
      </Box>
      <div className={classes.opt_section}>
        {INPUTS.map((start) => (
          <TextField
            onFocus={(e) => e.target.select()}
            inputRef={inputs[start]}
            type="number"
            name={`otp-${start}`}
            aria-label={`otp-${start}`}
            key={start}
            InputProps={{ className: classes.opt }}
            inputProps={{ className: classes.opt_input }}
            onKeyPress={(e) => onType(e.key, start)}
            value={otp[start]}
          />
        ))}
      </div>
      <Button
        name="verify"
        aria-label="verify"
        ref={submitEl}
        variant="contained"
        color="primary"
        onClick={verify}
        disabled={processing}
        className={classes.submit}
      >
        {processing ? <CircularProgress /> : 'Verify'}
      </Button>
    </div>
  )
}

VerifyEmail.propTypes = {
  classes: PropTypes.object.isRequired
}

VerifyEmail.defaultProps = {
  classes: {}
}
