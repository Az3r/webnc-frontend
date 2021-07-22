import { fetchGET, resources } from '@/utils/api'
import { toCoursePropTypesV2 } from '@/utils/conversion'

export { default } from '@/features/home'

export async function getStaticProps() {
  const trendingResponse = await fetchGET(resources.courses.trending)
  const mostViewedResponse = await fetchGET(resources.courses.mostviews)
  const newestResponse = await fetchGET(resources.courses.newest)
  const mostRegisteredResponse = await fetchGET(resources.topic.mostRegistered)
  return {
    props: {
      trending: trendingResponse.map(toCoursePropTypesV2),
      mostViewed: mostViewedResponse.map(toCoursePropTypesV2),
      newest: newestResponse.map(toCoursePropTypesV2),
      mostRegistered: mostRegisteredResponse.map((item) => ({
        id: item.categoryId,
        categoryId: item.categoryTypeId,
        label: item.categoryName,
        avatar: item.imageUrl,
        name: item.label
      }))
    },
    revalidate: 300
  }
}
