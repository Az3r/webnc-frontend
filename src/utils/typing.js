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
  duration: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
})

export const CoursePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
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

export const CourseDetailPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  lecturer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  rating: PropTypes.number.isRequired,
  reviewers: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  lastModified: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  bought: PropTypes.number.isRequired,
  feedbacks: PropTypes.arrayOf(FeedbackPropTypes.isRequired),
  lectures: PropTypes.arrayOf(LecturePropTypes.isRequired).isRequired,
  shortdesc: PropTypes.string.isRequired,
  detaildesc: PropTypes.string.isRequired,
  populars: PropTypes.arrayOf(CoursePropTypes).isRequired
})

export const CourseLibraryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lecturer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  lastModified: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  finished: PropTypes.bool.isRequired,
  lastWatched: PropTypes.number.isRequired
})

export const TopicPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }),
  label: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(CoursePropTypes.isRequired),
  others: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    })
  )
})

export const CategoryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(TopicPropTypes.isRequired).isRequired,
  bestsellers: PropTypes.arrayOf(CoursePropTypes.isRequired)
})

export const StudentPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
})

export const LecturerCoursePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  lastModified: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  shortdesc: PropTypes.string.isRequired,
  detaildesc: PropTypes.string.isRequired,
  statusId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  topicId: PropTypes.number.isRequired,
  lectures: PropTypes.arrayOf(LecturePropTypes.isRequired).isRequired
})
