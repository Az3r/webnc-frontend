export { default } from '@/features/course'
import mock from '@/mocks/course.json'
import { fetchGET, resources } from '@/utils/api'
import {
  toCourseDetailPropTypes,
  toFeedbackPropTypes
} from '@/utils/conversion'

export async function getStaticProps({ params }) {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      props: { course: mock }
    }

  const { id } = params
  try {
    const data = await fetchGET(resources.courses.get(id))
    const feedbacks = await fetchGET(resources.courses.feedback(id))

    return {
      props: {
        course: {
          ...toCourseDetailPropTypes(data),
          feedbacks: feedbacks.map(toFeedbackPropTypes)
        }
      }
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

  const ids = await fetchGET(resources.courses.all)
  return {
    paths: ids.map((item) => ({ params: { id: item.toString() } })),
    fallback: 'blocking'
  }
}
