export { default } from '@/features/topic'
import topic from '@/mocks/data/topic.json'
import { routes } from '@/utils/app'

export async function getStaticProps({ params }) {
  // const { course } = params

  if (topic)
    return {
      props: { topic },
      revalidate: 3600
    }
  return {
    redirect: {
      destination: routes.category('PLEASE FIX THIS'),
      permanent: true
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
