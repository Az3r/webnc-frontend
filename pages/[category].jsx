export { default } from '@/features/category'
import category from '@/mocks/category.json'

export async function getStaticProps({ params }) {
  // const { category } = params
  if (category) {
    return {
      props: { category },
      revalidate: 3600
    }
  }
  return {
    redirect: {
      destination: `/`,
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
