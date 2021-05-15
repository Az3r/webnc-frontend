export { default } from '@/home'

export async function getStaticProps(context) {
  return {
    props: {
      courses: context.previewData
    }
  }
}
