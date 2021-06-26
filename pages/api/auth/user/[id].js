import users from '@/mocks/data/users.json'
export default async function handler(req, res) {
  const { id } = req.query
  return res.status(200).json({ results: users[id] })
}
