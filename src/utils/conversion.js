import qs from 'qs'
//
// see utils/typing.js
//

/** api uses CamelCase */
export function toCoursePropTypes(course) {
  return {
    id: course.Id.toString(),
    thumbnail: course.ImageUrl.match(/https/)
      ? course.ImageUrl
      : '/images/logo.webp',
    title: course.Name,
    lecturer: {
      name: course.Lecturer.userName,
      avatar: course.Lecturer.avatarUrl
    },
    rating: course.Rating,
    reviewers: course.ReviewerNumber,
    price: course.Price,
    discount: course.Discount,
    bought: course.RegisteredNumber,
    tag: course.tag?.toLowerCase() || null
  }
}

/** api uses snakeCase */
export function toCoursePropTypesV2(course) {
  return {
    id: course.id.toString(),
    thumbnail: course.imageUrl.match(/https/)
      ? course.imageUrl
      : '/images/logo.webp',
    title: course.name,
    lecturer: {
      name: course.lecturer.userName,
      avatar: course.lecturer.avatarUrl
    },
    rating: course.rating,
    reviewers: course.reviewerNumber,
    price: course.price,
    discount: course.discount,
    bought: course.registeredNumber,
    tag: course.tag?.toLowerCase() || null
  }
}

export function toCourseDetailPropTypes(course) {
  return {
    id: course.id,
    thumbnail: course.imageUrl,
    title: course.name,
    lecturer: {
      name: course.lecturer.userName,
      avatar: course.lecturer.avatarUrl
    },
    rating: course.rating,
    reviewers: course.reviewerNumber,
    price: course.price,
    discount: course.discount,
    tag: course?.tag?.toLowerCase() || null,
    lastModified: course.lastUpdated,
    bought: course.registeredNumber,
    lectures: course.lectures?.map(toLecturePropTypes) || []
  }
}

export function toLecturePropTypes(lecture) {
  const { duration, videoUrl } = lecture
  const hour = Math.floor(duration / 3600)
  const minute = Math.floor((duration % 3600) / 60)
  const second = duration % 60
  const { v: url } = qs.parse(videoUrl.split('?', 2)[1])
  return {
    section: lecture.section,
    preview: lecture.preview || false,
    hour,
    second,
    minute,
    title: lecture.name,
    desc: lecture.discription,
    url
  }
}

export function toFeedbackPropTypes(feedback) {
  return {
    rating: feedback.rate,
    content: feedback.review,
    name: feedback.user.userName,
    avatar: feedback.user.avatarUrl
  }
}
