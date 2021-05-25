import { courses } from '@/mocks/api/home.handler'

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(404).send('404 resource not found')
  try {
    return res.status(200).json(courses())
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}
