export { default } from '@/features/category-list'
import categories from '@/mocks/data/category-list.json'

export async function getStaticProps() {
  return {
    props: {
      categories
    }
  }
}
