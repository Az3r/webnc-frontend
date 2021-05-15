export { default } from '@/home'
import courses from '@/public/data/courses.json'

export async function getStaticProps() {
  return {
    props: {
      courses
    }
  }
}
