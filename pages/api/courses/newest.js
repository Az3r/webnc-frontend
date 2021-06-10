import { newest } from '@/mocks/api/courses.handler'
import { mock } from '@/utils/api'

export default async function handler(req, res) {
  return mock(req, res, () => newest())
}
