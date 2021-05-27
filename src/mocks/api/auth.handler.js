import users from '../data/users.json'
import opts from '../data/opts.json'

export function login({ username, password }) {
  // find user having specific username
  const found = users.find((item) => item.username === username)
  if (!found) throw new Error(`auth/username-not-found:${username}`)

  // compare user's password with submitted password
  const valid = found.password === password
  if (!valid) throw new Error(`auth/password-not-match:${password}`)

  // check if user is verified
  if (found.verified === false)
    throw new Error(`auth/account-not-verified:${found.email}`)

  return found
}

export function register({ username, email, password }) {
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

export function verify({ email, OTPCode }) {
  if (!email.match(/(\w+)@(\w+)/))
    throw new Error(`auth/invalid-email:${email}`)
  const code = Number(OTPCode)
  return opts.includes(code)
}
