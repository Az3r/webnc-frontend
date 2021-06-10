import { own } from '@/mocks/api/dashboard.handler'
import { mock } from '@/utils/api'

export default async function handler(req, res) {
  return mock(req, res, () => own())
}
