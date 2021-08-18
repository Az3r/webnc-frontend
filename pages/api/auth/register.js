import users from '@/mocks/users.json'
import { withMockApi } from '@/utils/api'

export default withMockApi((req) => register(req.body))

function register({ username, email, password }) {
  // find user having specific username
  const found = users.find(
    (item) => item.username === username || item.email === email
  )
  if (found) {
    if (found.username === username) throw { code: 'InvalidUserName' }
    throw { code: 'InvalidEmail' }
  }
  if (password.length < 8) throw { code: 'PasswordTooShort' }
  return { username, email, password, id: '12345678' }
}
