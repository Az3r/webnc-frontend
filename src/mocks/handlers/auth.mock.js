import { rest } from 'msw'
import users from '@/mocks/data/users.json'
import { api } from '@/utils/app'

function handler({ username, password }) {
  // find user having specific username
  const found = users.find((item) => item.username === username)
  if (!found) throw new Error(`auth/username-not-found:${username}`)

  // compare user's password with submitted password
  const valid = found.password === password
  if (!valid) throw new Error(`auth/password-not-match:${password}`)

  return found
}

const login = rest.post(api.login, (req, res, ctx) => {
  try {
    const user = handler(req.body)
    return res(ctx.status(200), ctx.json(user))
  } catch (error) {
    return res(ctx.status(400), ctx.json(error.message))
  }
})

export default [login]
