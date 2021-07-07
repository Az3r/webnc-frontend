import { resources, fetchPOST } from '@/utils/api'
import qs from 'qs'

export const login = async ({ username = '', password = '' }) =>
  fetchPOST(resources.auth.login, { username, password, email: username })

export const register = async ({ username = '', email = '', password = '' }) =>
  fetchPOST(resources.auth.register, { username, email, password })

export const verify = async ({ email = '', code = -1 }) =>
  fetchPOST(
    resources.auth.verify,
    { email, code },
    {
      transformer: qs.stringify,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )

export const resend = async (email) => {
  fetchPOST(
    resources.auth.resend,
    { email },
    {
      transformer: qs.stringify,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return true
}
