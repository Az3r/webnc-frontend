import { resources, ApiError } from '@/utils/api'
import { create } from '@/utils/errors'

export async function login({ username = '', password = '' }) {
  const response = await fetch(resources.auth.login, {
    method: 'POST',
    body: JSON.stringify({ username, password, email: username }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const data = await response.json()
    console.log(data)
    throw ApiError({ ...data.errors, value: username })
  }
  const test = await fetch(resources.user.session, {
    credentials: 'include'
  }).then((response) => response.json())
  console.log(test)
  return response.json()
}

export async function regsiter({ username = '', email = '', password = '' }) {
  if (username && email && password) {
    const response = await fetch(resources.auth.register, {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const data = await response.json()
      throw ApiError(data.errors)
    }
    return response.json()
  }
  throw create('AuthError', 'invalid-account')
}

export async function verify({ email = '', code = -1 }) {
  const response = await fetch(resources.auth.verify, {
    method: 'POST',
    body: JSON.stringify({ email, OTPCode: code }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    const data = await response.json()
    throw ApiError(data.errors)
  }
  return true
}

/** send an otp code to specific email */
export async function resend(email) {
  fetch(resources.auth.resend, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return true
}
