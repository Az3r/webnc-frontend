import { withMockApi } from '@/utils/api'
import opts from '@/mocks/opts.json'

export default withMockApi((req) => verify(req.body))

function verify({ email, OTPCode }) {
  if (!email.match(/(\w+)@(\w+)/))
    throw new Error(`auth/invalid-email:${email}`)
  const code = Number(OTPCode)
  return opts.includes(code)
}
