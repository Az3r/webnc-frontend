import useSWR from 'swr'
import { performance } from './firebase'

/**
 * @typedef {'UnknownError' |
 * 'AuthError' |
 * 'ApiError'
 * } ErrorName
 * @typedef {'unknown' |
 * 'invalid-email' |
 * 'invalid-username' |
 * 'invalid-account' |
 * 'weak-password' |
 * 'account-existed' |
 * 'username-not-found' |
 * 'password-not-match' |
 * 'account-not-verified' |
 * 'invalid-otp' |
 * 'email-not-found'
 * } ErrorType
 * @typedef {Object} ErrorCode
 * @property {ErrorName} ErrorCode.scope
 * @property {ErrorType} ErrorCode.type
 * @property {string} ErrorCode.code ${scope}/${type}
 * @property {Error} ErrorCode.details
 * @property {unknown} ErrorCode.value
 */

/**
 * create error message
 * @param {ErrorName} name
 * @param {ErrorType} type
 * @param {object} value
 * @returns {Error & {name: ErrorName, code: string, value: object, type: ErrorType}}
 */
export function create(name, type, value) {
  const error = new Error(`${name}/${type}`)
  if (Error.captureStackTrace) Error.captureStackTrace(error)
  error.name = name
  error.type = type
  error.code = `${name}/${type}`
  error.value = value
  return error
}

/**
 * parse response error returned from api call
 * @param {Object} error
 * @returns {Error}
 */
export function ApiError(error = {}) {
  const { code, value = undefined, email = undefined } = error
  // use regex to catch multiple code at once
  if (code?.match(/PasswordRequires/))
    return create('AuthError', 'weak-password', value)

  // switch
  switch (code) {
    case 'NotVerifiedAccount':
      return create('AuthError', 'account-not-verified', email)
    case 'InvalidAccount':
      return create('AuthError', 'invalid-account', value)
    case 'NotExistedEmailAddress':
      return create('AuthError', 'email-not-found', value)
    case 'InvalidUserName':
      return create('AuthError', 'invalid-username', value)
    case 'InvalidEmail':
      return create('AuthError', 'invalid-email', value)
    case 'PasswordTooShort':
      return create('AuthError', 'weak-password', value)
    case 'InvalidOTPCode!':
      return create('AuthError', 'invalid-otp', value)
    default:
      return create(error.name || 'UnknownError', code, value)
  }
}

const production = process.env.NEXT_PUBLIC_MOCK_API == undefined

function resource(prod, dev) {
  // if development resource is not provided, use production endpoint instead
  const endpoint =
    !dev || production
      ? 'https://programmingcourse.herokuapp.com/api'
      : 'http://localhost:3000/api'

  const route = dev ? (production ? prod : dev) : prod
  return `${endpoint}${route}`
}

export const resources = {
  auth: {
    login: resource('/Auth/Login', '/auth/login'),
    logout: resource('/Auth/Logout', undefined),
    verify: resource('/Auth/VerifyTwoStepVerification', '/auth/verify'),
    register: resource('/Auth/Register', '/auth/register'),
    resend: resource('/Auth/ResendOTP', '/nothing'),
    changePassword: resource('/Auth/ChangePassword', '/auth/user/1')
  },
  courses: {
    all: resource('/Courses/GetCourseIdList'),
    get: (id) => resource(`/Courses/${id}`, undefined),
    feedback: (id) =>
      resource(
        `/Feedbacks/GetFeedbackListByCourseId?courseId=${id}`,
        undefined
      ),
    bestSellerOfSameTopic: (courseId, topicId) =>
      resource(
        `/Courses/BestSellerCoursesByCategoryId?courseId=${courseId}&categoryId=${topicId}`,
        undefined
      ),
    search: (q) =>
      resource(
        `/Courses/GetCourseListByFilterAndPaginationParameters?${q}`,
        '/courses'
      ),
    post: resource('/Courses', '/nothing'),
    trending: resource('/Courses/OutstandingCourses', '/courses/trending'),
    mostviews: resource('/Courses/MostViewedCourses', '/courses/mostviews'),
    newest: resource('/Courses/NewestCourses', '/courses/newest'),
    bestseller: resource('/Courses/BestSellerCourses', '/courses/bestseller')
  },
  categoryType: {
    all: resource('/CategoryTypes', undefined),
    get: (id) => resource(`/CategoryTypes/${id}`, `/category-type`),
    detail: (id) =>
      resource(`/CategoryTypes/GetFormattedCategoryTypeById?id=${id}`),
    bestseller: (id) =>
      resource(
        `/Courses/Get10BestSellerCoursesInMonthByCategoryTypeId?categoryTypeId=${id}`,
        undefined
      )
  },
  topic: {
    get: (name) =>
      resource(`/Categories/GetWithAllInfoByName?name=${name}`, undefined),
    course: (id, size, offset) =>
      resource(
        `/Courses/GetCourseListByFilterAndPaginationParameters?CategoryId=${id}&PageNumber=${offset}&PageSize=${size}`,
        '/courses'
      )
  },
  user: {
    get: (id) => resource(`/Users/${id}`, `/auth/user/${id}`),
    put: resource('/Users', `/auth/user/1`),
    session: resource('/Auth/IsLoggedIn', '/auth/user/1')
  },
  shop: {
    get: (id) =>
      resource(`/Carts/GetCourseListByStudentId?studentId=${id}`, '/courses'),
    post: resource('/Carts/AddCourseToCart', '/nothing'),
    remove: resource('/Carts/RemoveCourseFromCart', '/nothing')
  },
  watchlist: {
    get: (id) =>
      resource(
        `/WatchLists/GetWatchListListByStudentId?studentId=${id}`,
        '/courses'
      ),
    post: resource('/WatchLists', '/nothing'),
    remove: (id) => resource(`/WatchLists/${id}`, '/nothing')
  },
  library: {
    get: (id) =>
      resource(
        `/StudentCourses/GetStudentCourseListByStudentId?studentId=${id}`,
        `/library`
      ),
    post: resource('/StudentCourses/AddWithMultipleCourses', '/nothing')
  },
  lecturer: {
    course: (id) =>
      resource(
        `/Courses/GetCourseListByLecturerId?lecturerId=${id}`,
        '/lecturer/courses'
      )
  },
  feedback: {
    get: (userId, courseId) =>
      resource(
        `/Feedbacks/FeedbackByStudentIdAndCourseId?studentId=${userId}&courseId=${courseId}`
      ),
    post: resource('/Feedbacks', '/nothing')
  },
  view: {
    post: resource('/Views', '/nothing')
  },
  courseProcess: {
    get: (studentId, courseId) =>
      resource(
        `/CourseProcesses/GetByStudentIdAndCourseId?studentId=${studentId}&courseId=${courseId}`
      ),
    post: resource('/CourseProcesses', '/nothing')
  }
}

/**
 * simple mock api handler that encapsulates basic workflow
 * @param {(req: import('next').NextApiRequest) => Promise<unknown>} handler
 * @returns {import('next').NextApiHandler}
 */
export function withMockApi(handler) {
  return async (req, res) => {
    try {
      const response = await handler?.call(undefined, req)
      return res.status(200).json({ results: response })
    } catch (error) {
      return res.status(404).json({ errors: error })
    }
  }
}

export async function fetchGET(url) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await response.json()
  if (response.ok) return data.results
  throw ApiError(data.errors)
}

export async function fetchPOST(url, payload, config) {
  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    ...config
  })
  const data = await response.json()
  if (response.ok) return data.results
  throw ApiError(data.errors)
}

export function useGET(url) {
  const { data, error, mutate } = useSWR(url, fetchGET)
  const loading = !data && !error
  return { mutate, data, error, loading }
}

export function useGetCategory(id) {
  const { data, ...props } = useGET(() => id && resources.categoryType.get(id))

  const topics =
    data?.categories.map((item) => {
      const { name: label, label: name, imageUrl: avatar, id } = item
      return {
        id,
        name,
        label,
        avatar
      }
    }) || []
  return { data: topics, ...props }
}

export function useGetCategoryV2() {
  const { data, ...props } = useGET(resources.categoryType.all)
  if (!data) return { data: [], ...props }

  const categories = data.map((category) => {
    const { id, name, categories } = category
    return {
      id,
      label: name,
      name: id === 1 ? 'web' : id === 2 ? 'mobile' : null,
      avatar:
        id === 1
          ? '/images/category/web.webp'
          : id === 2
          ? '/images/category/mobile.webp'
          : null,
      topics: categories.map((topic) => ({
        id: topic.id,
        label: topic.name,
        name: topic.label,
        avatar: topic.imageUrl?.match(/https?/)
          ? topic.imageUrl
          : '/images/logo.webp'
      }))
    }
  })
  return { data: categories, ...props }
}

export function useGetCourseProcesses(userId, courseId) {
  const key =
    userId && courseId && resources.courseProcess.get(userId, courseId)
  const { data, ...props } = useGET(() => key)
  if (!data) return { data: null, ...props }

  return {
    data: {
      lectureId: data.courseProcess.lectureId,
      lastWatched: data.courseProcess.lastUpdated
    },
    ...props
  }
}
