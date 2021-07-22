export { default } from '@/features/student/watch'
import mock from '@/mocks/course.json'
import { fetchGET, resources } from '@/utils/api'
import { toWatchCoursePropTypes } from '@/utils/conversion'

export async function getStaticProps({ params }) {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      props: { course: mock }
    }

  const { id } = params
  try {
    const courseResponse = await fetchGET(resources.courses.get(id))
    const course = toWatchCoursePropTypes(courseResponse)

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
