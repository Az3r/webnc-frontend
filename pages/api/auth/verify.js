import { withMockApi } from '@/utils/api'
import opts from '@/mocks/opts.json'

export default withMockApi((req) => verify(req.body))

function verify({ email, OTPCode }) {
  if (!email.match(/(\w+)@(\w+)/)) throw { code: 'InvalidEmail' }
  const code = Number(OTPCode)
  const verified = opts.includes(code)
  if (verified) return verified
  throw { code: 'InvalidOTPCode!' }
}
