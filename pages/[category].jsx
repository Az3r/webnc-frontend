export { default } from '@/features/category'
import data from '@/mocks/category.json'
import { fetchGET, resources } from '@/utils/api'

export async function getStaticProps({ params }) {
  // for developtment
  return {
    props: { category: data }
  }

  /*
  const id = params.category === 'web' ? 1 : 2
  try {
    const {
      categories = [],
      bestSeller = [],
      ...props
    } = await fetchGET(resources.categoryType.detail(id))

    const topics = await Promise.all(
      categories.map(async (topic) => {
        const { Id, Name, Label, ImageUrl, Courses = [] } = topic
        const courses = await Promise.all(
          Courses.map(async (course) => {
            const {
              LecturerId,
              Id,
              Price,
              Name,
              ImageUrl,
              Discount,
              Rating,
              ReviewerNumber,
              RegisterNumber
            } = course
            const lecturer = await fetchGET(resources.user.get(LecturerId))
            return {
              id: Id,
              price:Price,name:Name
            }
          })
        )
        return {
          id: Id,
          name: Name,
          label: Label,
          avatar: ImageUrl
        }
      })
    )

    return {
      props: {
        category: {
          topics,
          bestsellers,
          ...props
        }
      },
      revalidate: 3600
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
  */
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
  /*
  return {
    paths: [
      { params: { category: 'web' } },
      { params: { category: 'mobile' } }
    ],
    fallback: false
  }
  */
}
