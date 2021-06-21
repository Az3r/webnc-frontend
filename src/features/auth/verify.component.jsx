import React, { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AuthContext from './auth.context'
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@material-ui/core'
import { CancelScheduleSend, Send } from '@material-ui/icons'
import { parse } from '@/utils/errors'
import { useSnackBar } from '@/components/snackbar.provider'
import { useRouter } from 'next/router'
import { routes } from '@/utils/app'

const WELCOME =
  "An OPT code has been sent to your email address, if you don't recieve one, you can click on the send button to the right"
const INPUTS = [0, 1, 2, 3, 4, 5]
export default function VerifyEmail({ classes }) {
  const { form } = useContext(AuthContext)
  const { show } = useSnackBar()

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
      setCooldown(5)
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

      router.push(
        {
          pathname: '/',
          query: form
        },
        '/'
      )
      show({
        open: true,
        severity: 'success',
        message: 'Account verified'
      })
    } catch (e) {
      const error = parse(e)
      show({ open: true, severity: 'error', message: error.code })
    } finally {
      process(false)
    }
  }

  const wait =
    cooldown > 0
      ? `Please wait for ${cooldown} seconds before you can resend another one, you should also check in spam or junk mail folder`
      : undefined

  return (
    <div className={classes.form}>
      <TextField
        style={{ height: 128 }}
        tabIndex="-1"
        name="email"
        type="email"
        aria-label="email"
        helperText={first ? WELCOME : wait}
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
