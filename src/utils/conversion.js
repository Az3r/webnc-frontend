//
// see utils/typing.js
//

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
    bought: course.RegisteredNumber
  }
}
