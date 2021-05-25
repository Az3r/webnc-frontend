import users from '@/public/data/users.json'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(404).send('404 not found')
  const { username, password } = req.body
  const found = users.find((item) => {
    item.username === username && item.password === password
  })
  if (found) return res.status(200).json(found)
  return res.status(404).json({
    error: {
      code: 'auth/user-not-found'
    }
  })
}
