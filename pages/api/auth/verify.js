import { withMockApi } from '@/utils/api'
import opts from '@/mocks/opts.json'

export default withMockApi((req) => verify(req.body))

function verify({ email, code }) {
  if (!email.match(/(\w+)@(\w+)/)) throw { code: 'InvalidEmail' }
  const verified = opts.includes(Number(code))
  if (verified) return verified
  throw { code: 'InvalidOTPCode!' }
}
