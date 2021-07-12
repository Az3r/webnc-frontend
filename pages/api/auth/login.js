import users from '@/mocks/users.json'
import { withMockApi } from '@/utils/api'

export default withMockApi((req) => login(req.body))

function login({ username, password }) {
  const found = users.find(
    (item) => item.userName === username && item.password === password
  )
  if (!found) throw { code: 'InvalidAccount' }

  // check if user is verified
  if (!found.verified) throw { code: 'NotVerifiedAccount', email: found.email }

  return found
}
