import { resources, ApiError } from '@/utils/api'
import qs from 'qs'
import { create } from '@/utils/errors'

export async function login({ username = '', password = '' }) {
  const response = await fetch(resources.auth.login, {
    method: 'POST',
    body: qs.stringify({ username, password, email: username }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400) {
    const data = await response.json()
    throw ApiError(data.error)
  }
  return response.json()
}

export async function regsiter({ username = '', email = '', password = '' }) {
  const response = await fetch(resources.auth.register, {
    method: 'POST',
    body: qs.stringify({ username, password, email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400) {
    const data = await response.json()
    throw ApiError(data.error)
  }
  return response.json()
}

export async function verify({ email = '', code = -1 }) {
  const response = await fetch(resources.auth.verify, {
    method: 'POST',
    body: qs.stringify({ email, OTPCode: code }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400) {
    const data = await response.json()
    throw ApiError(data.error)
  }
  return true
}

/** send an otp code to specific email */
export async function resend(email) {
  fetch(resources.auth.resend, {
    method: 'POST',
    body: qs.stringify({ email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return true
}
