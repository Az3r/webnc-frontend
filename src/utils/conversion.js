//
// see utils/typing.js
//

/** api uses CamelCase */
export function toCoursePropTypes(course) {
  if (process.env.NEXT_PUBLIC_MOCK_API) return course
  return {
    id: course.Id,
    thumbnail: course.ImageUrl.match(/https?/)
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
  if (process.env.NEXT_PUBLIC_MOCK_API) return course
  return {
    id: course.id,
    thumbnail: course.imageUrl.match(/https?/)
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
  if (process.env.NEXT_PUBLIC_MOCK_API) return course
  return {
    id: course.id,
    thumbnail: course.imageUrl,
    title: course.name,
    category: {
      id: course.categoryTypeId,
      label: course.categoryTypeName,
      name: course.categoryTypeId === 1 ? 'web' : 'mobile'
    },
    topic: {
      id: course.categoryId,
      label: course.categoryName,
      name: course.categoryName.toLowerCase()
    },
    lecturer: {
      name: course.lecturer.userName,
      avatar: course.lecturer.avatarUrl,
      description: course.lecturer.discription || ''
    },
    rating: course.rating,
    reviewers: course.reviewerNumber,
    price: course.price,
    discount: course.discount,
    lastModified: new Date(course.lastUpdated).getTime(),
    bought: course.registeredNumber,
    lectures: course.lectures?.map(toLecturePropTypes) || [],
    shortdesc: course.shortDiscription,
    detaildesc: course.detailDiscription
  }
}

export function toLecturePropTypes(lecture) {
  if (process.env.NEXT_PUBLIC_MOCK_API) return lecture
  const { id, name, duration, videoUrl, section, isPreview } = lecture
  return {
    id,
    section,
    preview: isPreview,
    duration,
    title: name,
    url: videoUrl
  }
}

export function toFeedbackPropTypes(feedback) {
  if (process.env.NEXT_PUBLIC_MOCK_API) return feedback
  return {
    rating: feedback.rate,
    content: feedback.review,
    name: feedback.user.userName,
    avatar: feedback.user.avatarUrl
  }
}

export function toLibraryCoursePropTypes(course) {
  return {
    id: course.id,
    thumbnail: course.imageUrl || '/images/logo.webp',
    title: course.courseName,
    lecturer: {
      name: course.lecturerName,
      avatar: course.lecturerAvatar
    },
    lastModified: course.lastUpdated,
    finished: course.statusId === 1
  }
}

export function toWatchCoursePropTypes(course) {
  if (process.env.NEXT_PUBLIC_MOCK_API) return course
  return {
    id: course.id,
    thumbnail: course.imageUrl,
    title: course.name,
    lectures: course.lectures?.map(toLecturePropTypes) || []
  }
}
