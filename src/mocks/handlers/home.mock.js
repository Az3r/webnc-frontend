import { rest } from 'msw'
import * as home from '../api/home.handler'
import { resources } from '@/utils/api'

const get = rest.get(resources.courses, (req, res, ctx) => {
  const courses = home.courses()
  return res(ctx.status(200), ctx.json(courses))
})

export default [get]
