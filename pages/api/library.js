import courses from '@/mocks/library.json'
export default async function handler(req, res) {
  return res.status(200).json({ results: courses })
}
