import users from '@/mocks/users.json'
import { withMockApi } from '@/utils/api'

export default withMockApi((req) => register(req.body))

function register({ username, email, password }) {
  // find user having specific username
  const found = users.find(
    (item) => item.username === username || item.email === email
  )
  if (found) {
    if (found.username === username)
      throw new Error(`auth/username-existed:${username}`)
    throw new Error(`auth/email-existed:${email}`)
  }

  if (password.length < 8) throw new Error(`auth/weak-password:${password}`)

  return { username, email, password, id: '12345678' }
}
