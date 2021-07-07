import useSWR from 'swr'
import { create } from './errors'
/**
 * parse response error returned from api call
 * @param {Object} error
 * @returns {Error}
 */
export function ApiError(error = {}) {
  const { code, value = undefined } = error
  // use regex to catch multiple code at once
  if (code.match(/PasswordRequires/))
    return create('AuthError', 'weak-password', value)

  // switch
  switch (code) {
    case 'NotVerifiedAccount':
      return create('AuthError', 'account-not-verified', value)
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
      return create('UnknownError', code, value)
  }
}

const production = process.env.NEXT_PUBLIC_MOCK_API == undefined

function resource(prod, dev) {
  return `${endpoint}${production ? prod : dev}`
}
export const endpoint = production
  ? 'https://programmingcourse.herokuapp.com/api'
  : 'http://localhost:3000/api'

export const resources = {
  auth: {
    login: resource('/Auth/Login', '/auth/login'),
    logout: resource('/Auth/Logout', undefined),
    verify: resource('/Auth/VerifyTwoStepVerification', '/auth/verify'),
    register: resource('/Auth/Register', '/auth/register'),
    resend: resource('/Auth/ResendOTP', '/auth/resend')
  },
  courses: {
    all: resource('/Courses', '/courses/all'),
    trending: resource('/Courses/OutstandingCourses', '/courses/trending'),
    mostviews: resource('/Courses/MostViewedCourses', '/courses/mostviews'),
    newest: resource('/Courses/NewestCourses', '/courses/newest'),
    bestseller: resource('/Courses/BestSellerCourses', '/courses/bestseller')
  },
  categoryType: {
    get: (id) => resource(`/CategoryTypes/${id}`, `/category-type/${id}`)
  },
  user: {
    get: (id) => resource(`/Users/${id}`, `/auth/user/${id}`),
    session: resource('/Auth/IsLoggedIn', '/auth/user/1')
  },
  shop: {
    get: (id) => resource(undefined, `/shop/${id}`)
  },
  watchlist: {
    get: (id) =>
      resource(`/WatchLists/GetAllByStudentId/${id}`, `/watchlist/${id}`)
  },
  library: {
    get: (id) =>
      resource(
        `/StudentCourses/GetAllByStudentId?studentId=${id}`,
        `/library/${id}`
      )
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
  const response = await fetch(url, { credentials: 'include' })
  const data = await response.json()
  if (response.ok) return data.results
  throw ApiError(data.errors)
}

export function useGET(url, config) {
  const { data, error, mutate } = useSWR(url, fetchGET, config)
  const loading = !data && !error
  return { mutate, data, error, loading }
}

export async function fetchPOST(
  url,
  payload,
  transformer = JSON.stringify,
  headers = {}
) {
  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: transformer(payload)
  })
  const data = await response.json()
  if (response.ok) return data.results
  throw ApiError(data.errors)
}
