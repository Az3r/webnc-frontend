import PropTypes from 'prop-types'

export const CoursePropTypes = PropTypes.shape({
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lecturer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  rating: PropTypes.number.isRequired,
  reviewers: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  tag: PropTypes.string,
  lastModified: PropTypes.number.isRequired,
  bought: PropTypes.number.isRequired,
  watchlisted: PropTypes.bool
})

export const TopicPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(CoursePropTypes.isRequired)
})

export const CategoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(TopicPropTypes.isRequired).isRequired,
  bestsellers: PropTypes.arrayOf(CoursePropTypes.isRequired)
})
