import courses from '@/mocks/data/courses.json'
export default async function handler(req, res) {
  return res
    .status(200)
    .json({ results: courses.slice(0, Math.random() * 95 + 5) })
}
