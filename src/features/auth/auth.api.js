import { resources, ApiError, fetchPOST } from '@/utils/api'

export const login = async ({ username = '', password = '' }) =>
  fetchPOST(resources.auth.login, { username, password, email: username })

export const register = async ({ username = '', email = '', password = '' }) =>
  fetchPOST(resources.auth.regsiter, { username, email, password })

export async function verify({ email = '', code = -1 }) {
  const response = await fetchPOST(resources.auth.verify, {
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
  fetchPOST(resources.auth.resend, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return true
}
