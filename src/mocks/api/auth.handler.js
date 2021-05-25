import users from '../data/users.json'

export function login({ username, password }) {
  // find user having specific username
  const found = users.find((item) => item.username === username)
  if (!found) throw new Error(`auth/username-not-found:${username}`)

  // compare user's password with submitted password
  const valid = found.password === password
  if (!valid) throw new Error(`auth/password-not-match:${password}`)

  return found
}
