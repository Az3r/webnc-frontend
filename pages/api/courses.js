import courses from '@/mocks/courses.json'
export default async function handler(req, res) {
  return res.status(200).json({ results: courses.slice(0, 10) })
}
