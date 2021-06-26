/**
 * parse response error returned from api call
 * @param {Object} error
 */
export function parse(error = {}) {
  const [code, value] = error.split(':', 2)
  const [scope, type] = code.split('/', 2)
  return {
    code,
    value,
    scope,
    type
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
  user: {
    get: (id) => resource(`/Users/${id}`, `/auth/user/${id}`)
  }
}

/**
 *
 * @param {Function} callback
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function mock(req, res, callback) {
  try {
    const response = await callback()
    return res.status(200).json({ results: response })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}
