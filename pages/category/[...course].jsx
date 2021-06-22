export { default } from '@/features/topic'
import categories from '@/mocks/data/categories.json'

export async function getStaticProps({ params }) {
  const { course } = params
  const [categoryName, topicName] = course

  const category = categories.find((item) => item.name === categoryName)
  if (!category)
    return {
      redirect: {
        destination: `/category`,
        permanent: true
      }
    }

  const topic = category.topics.find((topic) => topic.name === topicName)
  if (!topic)
    return {
      redirect: {
        destination: `/category/${category.name}`,
        permanent: true
      }
    }

  return {
    props: { topic },
    revalidate: 3600
  }
}

export async function getStaticPaths() {
  const keys = []
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    for (let k = 0; k < category.topics.length; k++) {
      const topic = category.topics[k]
      keys.push({ params: { course: [category.name, topic.name] } })
    }
  }
  return {
    paths: keys,
    fallback: 'blocking'
  }
}
