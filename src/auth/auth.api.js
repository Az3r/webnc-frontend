import { api } from '@/utils/app'
import qs from 'qs'
import { create } from '@/utils/errors'

export async function login({ username = '', password = '' }) {
  const response = await fetch(api.login, {
    method: 'POST',
    body: qs.stringify({ username, password }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (response.status >= 400)
    throw create('auth', 'unknown', JSON.stringify({ username, password }))
  return response.json()
}
