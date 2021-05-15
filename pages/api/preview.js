import courses from '@/public/data/courses.json'
export default function handler(req, res) {
  res.setPreviewData(courses)
  res.end('Preview mode enabled')
}
