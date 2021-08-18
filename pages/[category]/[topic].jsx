export { default } from '@/features/topic'
import mock from '@/mocks/topic.json'
import { fetchGET, resources } from '@/utils/api'
import { toCoursePropTypesV2 } from '@/utils/conversion'

export async function getStaticProps({ params }) {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      props: { topic: mock }
    }

  const { category, topic } = params

  // go to 404 for unknown category
  if (category !== 'web' && category !== 'mobile')
    return {
      notFound: true
    }

  try {
    const {
      id,
      label: name,
      name: label,
      imageUrl: avatar,
      categoryTypeId,
      categoryTypeName,
      courses
    } = await fetchGET(resources.topic.get(topic))

    const others = await fetchGET(
      resources.categoryType.get(category === 'web' ? 1 : 2)
    )
    return {
      props: {
        topic: {
          id: id,
          name: name || label.toLowerCase(),
          avatar,
          category: {
            id: categoryTypeId,
            label: categoryTypeName,
            name: category
          },
          label,
          courses: courses.map(toCoursePropTypesV2),
          others: others.categories.map((item) => ({
            id: item.id,
            name: item.label || item.name.toLowerCase(),
            label: item.name,
            avatar: item.imageUrl
          }))
        }
      },
      revalidate: 3600
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export async function getStaticPaths() {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      paths: [],
      fallback: 'blocking'
    }

  const webCategory = await fetchGET(resources.categoryType.get(1))
  const webTopics = webCategory.categories.map((item) => ({
    params: { category: 'web', topic: item.label || item.name.toLowerCase() }
  }))

  const mobileCategory = await fetchGET(resources.categoryType.get(2))
  const mobileTopics = mobileCategory.categories.map((item) => ({
    params: { category: 'mobile', topic: item.label || item.name.toLowerCase() }
  }))

  return {
    paths: [...webTopics, ...mobileTopics],
    fallback: 'blocking'
  }
}
