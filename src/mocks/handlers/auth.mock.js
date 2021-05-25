import { rest } from 'msw'
import * as handlers from '../api/auth.handler'
import { resources } from '@/utils/api'

const login = rest.post(resources.login, (req, res, ctx) => {
  try {
    const user = handlers.login(req.body)
    return res(ctx.status(200), ctx.json(user))
  } catch (error) {
    return res(ctx.status(400), ctx.json(error.message))
  }
})

export default [login]
