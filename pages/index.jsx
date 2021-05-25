import { resources } from '@/utils/api'

export { default } from '@/features/home'

export async function getStaticProps() {
  const response = await fetch(resources.courses)

  let courses = []
  if (response.ok) courses = await response.json()

  return {
    props: {
      courses
    },
    revalidate: 3600
  }
}
