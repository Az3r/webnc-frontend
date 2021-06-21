import React from 'react'
import { useRouter } from 'next/router'
import ExploreFeature from '@/features/explore'

export default function CategoryPage() {
  const router = useRouter()
  const { category, topic } = router.query
  return <ExploreFeature category={category} topic={topic} />
}
