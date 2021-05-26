import { verify } from '@/mocks/api/auth.handler'

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(404).send('404 resource not found')
  try {
    const success = verify(req.body)
    return res.status(200).json({ success })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}
