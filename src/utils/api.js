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

const production = mock.env.NEXT_PUBLIC_MOCK_API == undefined
const map = {
  auth: {
    login: production ? '/Auth/Login' : '/auth/login',
    verify: production ? '/Auth/VerifyTwoStepVerification' : '/auth/verify',
    register: production ? '/Auth/Register' : '/auth/register',
    resend: production ? '/Auth/ResendOTP' : '/auth/resend'
  },
  courses: {
    all: production ? '/Courses' : '/courses/all',
    trending: production ? '/Courses/OutstandingCourses' : '/courses/trending',
    mostviews: production ? '/Courses/MostViewedCourses' : '/courses/mostviews',
    newest: production ? '/Courses/NewestCourses' : '/courses/newest',
    bestseller: production
      ? '/Courses/BestSellerCourses'
      : '/courses/bestseller'
  },
  student: {
    courses: production ? '/StudentCourses/GetAllByStudentId/' : '/student/'
  },
  watchlist: {
    get: production ? '/WatchLists/GetAllByStudentId/' : '/favorites/'
  }
}

function endpoint(name) {
  const url = production
    ? 'https://programmingcourse.herokuapp.com/api'
    : 'http://localhost:3000/api'
  return url + name
}

export const resources = {
  auth: {
    login: endpoint(map.auth.login),
    verify: endpoint(map.auth.verify),
    register: endpoint(map.auth.register),
    resend: endpoint(map.auth.resend)
  },
  courses: {
    all: endpoint(map.courses.all),
    trending: endpoint(map.courses.trending),
    mostviews: endpoint(map.courses.mostviews),
    newest: endpoint(map.courses.newest)
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
