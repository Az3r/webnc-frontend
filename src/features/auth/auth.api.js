import { resources } from '@/utils/api'
import qs from 'qs'
import { create } from '@/utils/errors'
import { parse } from '@/utils/api'

export async function login({ username = '', password = '' }) {
  const response = await fetch(resources.login, {
    method: 'POST',
    body: qs.stringify({ username, password }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400) {
    const data = await response.json()
    const error = parse(data.error)
    throw create(error.scope, error.type, error.value)
  }
  return response.json()
}

export async function regsiter({ username = '', email = '', password = '' }) {
  const response = await fetch(resources.register, {
    method: 'POST',
    body: qs.stringify({ username, password, email }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400) {
    const data = await response.json()
    const error = parse(data.error)
    throw create(error.scope, error.type, error.value)
  }
  return response.json()
}

export async function verify({ email = '', code = -1 }) {
  const response = await fetch(resources.verify, {
    method: 'POST',
    body: qs.stringify({ email, OTPCode: code }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400) {
    const data = await response.json()
    const error = parse(data.error)
    throw create(error.scope, error.type, error.value)
  }
  return response.json()
}
