import { resources, fetchPOST } from '@/utils/api'

export const login = async ({ username = '', password = '' }) =>
  fetchPOST(resources.auth.login, { username, password, email: username })

export const register = async ({ username = '', email = '', password = '' }) =>
  fetchPOST(resources.auth.register, { username, email, password })

export const verify = async ({ email = '', code = -1 }) =>
  fetchPOST(resources.auth.verify, { email, otpCode: code })

export const resend = async (email) => {
  fetchPOST(resources.auth.resend, { email })
  return true
}
