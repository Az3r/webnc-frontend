import users from '@/mocks/users.json'

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(404).send('404 resource not found')
  const { username, password } = req.body

  // find user having specific username
  const found = users.find((item) => item.username === username)
  if (!found)
    return res
      .status(404)
      .json({ error: `auth/username-not-found:${username}` })

  // compare user's password with submitted password
  const valid = found.password === password
  if (!valid)
    return res
      .status(404)
      .json({ error: `auth/password-not-match:${password}` })

  return res.status(200).json(found)
}
