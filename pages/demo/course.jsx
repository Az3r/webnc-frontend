export { default } from '@/components/course/course-row'
import courses from '@/mocks/courses.json'

export async function getStaticProps() {
  return {
    props: { course: courses[0] }
  }
}
