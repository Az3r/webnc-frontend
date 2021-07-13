import category from '@/mocks/category.json'
export default function handler(req, res) {
  const categories = category.topics.map((item) => ({
    name: item.label,
    label: item.name,
    imageUrl: item.avatar
  }))
  return res.status(200).json({ results: { categories } })
}
