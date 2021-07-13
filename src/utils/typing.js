import PropTypes from 'prop-types'

export const FeedbackPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
})

export const LecturePropTypes = PropTypes.shape({
  section: PropTypes.number,
  preview: PropTypes.bool,
  hour: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  minute: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
})

export const CourseDetailPropTypes = PropTypes.shape({
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
  watchlisted: PropTypes.bool,
  feedbacks: PropTypes.arrayOf(FeedbackPropTypes.isRequired).isRequired,
  lectures: PropTypes.arrayOf(LecturePropTypes.isRequired).isRequired,
  inUserLibrary: PropTypes.bool,
  userProgression: PropTypes.number
})

export const CoursePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
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
  bought: PropTypes.number.isRequired
})

export const CourseLibraryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lecturer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  lastModified: PropTypes.number.isRequired,
  finished: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  lastWatched: PropTypes.number.isRequired
})

export const TopicPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }),
  label: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(CoursePropTypes.isRequired),
  others: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired
})

export const CategoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(TopicPropTypes.isRequired).isRequired,
  bestsellers: PropTypes.arrayOf(CoursePropTypes.isRequired)
})

export const StudentPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
})
