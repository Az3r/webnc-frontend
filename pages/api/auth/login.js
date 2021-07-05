import users from '@/mocks/users.json'
import { withMockApi } from '@/utils/api'

export default withMockApi((req) => login(req.body))

function login({ username, password }) {
  // find user having specific username
  const found = users.find(
    (item) => item.userName === username && item.password === password
  )
  if (!found) throw { code: 'InvalidAccount' }

  // check if user is verified
  if (!found.verified) throw { code: 'AccountNotVerified' }

  return found
}
