export { default } from '@/features/category'
import categories from '@/mocks/data/categories.json'

export async function getStaticProps() {
  return {
    props: {
      categories
    }
  }
}
