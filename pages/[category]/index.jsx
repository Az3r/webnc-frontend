export { default } from '@/features/category'
import data from '@/mocks/category.json'
import { fetchGET, resources } from '@/utils/api'
import { toCoursePropTypesV2 } from '@/utils/conversion'

export async function getStaticProps({ params }) {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      props: { category: data }
    }

  const id = params.category === 'web' ? 1 : 2
  try {
    const { categoryType, dynamicCategoryList } = await fetchGET(
      resources.categoryType.detail(id)
    )
    const bestsellers = await fetchGET(resources.categoryType.bestseller(id))

    return {
      props: {
        category: {
          id: categoryType.id,
          name: params.category,
          label: categoryType.name,
          topics: categoryType.categories.map((item, index) => {
            const { id, name: label, label: name, imageUrl } = item
            return {
              id: id,
              name: name || label.toLowerCase(),
              avatar: imageUrl,
              label,
              courses: dynamicCategoryList[index].map(toCoursePropTypesV2)
            }
          }),
          bestsellers: bestsellers.map(toCoursePropTypesV2)
        }
      },
      revalidate: 300
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
  return {
    paths: [
      { params: { category: 'web' } },
      { params: { category: 'mobile' } }
    ],
    fallback: false
  }
}
