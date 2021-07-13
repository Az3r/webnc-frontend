export { default } from '@/features/course'
import mock from '@/mocks/course.json'
import { fetchGET, resources } from '@/utils/api'

export async function getStaticProps({ params }) {
  if (process.env.NEXT_PUBLIC_MOCK_API)
    return {
      props: { course: mock }
    }

  return {
    notFound: true
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
    paths: [ids.map((item) => ({ params: { id: item.id } }))],
    fallback: 'blocking'
  }
}
