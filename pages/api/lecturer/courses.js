import courses from '@/mocks/lecturer_courses.json'
export default async function handler(req, res) {
  return res.status(200).json({ results: courses })
}
