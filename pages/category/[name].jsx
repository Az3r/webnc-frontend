export { default } from '@/features/category'
import category from '@/mocks/data/category.json'

export async function getStaticProps({ params }) {
  const { name } = params
  if (category)
    return {
      props: { category },
      revalidate: 3600
    }
  return {
    redirect: {
      destination: `/category`,
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
