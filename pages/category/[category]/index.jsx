import React from 'react'
import { useRouter } from 'next/router'
import ExploreFeature from '@/features/explore'

export default function CategoryPage() {
  const router = useRouter()
  const { category } = router.query
  return <ExploreFeature category={category} />
}
