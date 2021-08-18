export { default } from '@/features/course'
import mock from '@/mocks/course.json'
import { fetchGET, resources } from '@/utils/api'
import {
  toCourseDetailPropTypes,
  toCoursePropTypesV2,
  toFeedbackPropTypes
} from '@/utils/conversion'

export async function getStaticProps({ params }) {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      props: { course: mock }
    }

  const { id } = params
  try {
    const courseResponse = await fetchGET(resources.courses.get(id))
    const course = toCourseDetailPropTypes(courseResponse)

    const feedbackResponse = await fetchGET(resources.courses.feedback(id))
    course.feedbacks = feedbackResponse.map(toFeedbackPropTypes)

    const bestSellerResponse = await fetchGET(
      resources.courses.bestSellerOfSameTopic(id, course.topic.id)
    )
    course.populars = bestSellerResponse.map(toCoursePropTypesV2)

    return {
      props: {
        course
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

  const ids = await fetchGET(resources.courses.all)
  return {
    paths: ids.map((id) => ({ params: { id: `${id}` } })),
    fallback: 'blocking'
  }
}
