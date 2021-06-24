export { default } from '@/features/student/watch'
import course from '@/mocks/data/course.json'

export async function getStaticProps({ params }) {
  // const { category } = params
  if (course)
    return {
      props: { course },
      revalidate: 3600
    }
  return {
    notFound: true
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
