export { default } from '@/home'
import courses from '@/mocks/courses.json'

export async function getStaticProps() {
  return {
    props: {
      courses
    }
  }
}
