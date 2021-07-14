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
