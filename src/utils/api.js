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
const map = {
  login: production ? '/Auth/Login' : '/login',
  verify: production ? '/Auth/VerifyTwoStepVerification' : '/verify',
  register: production ? '/Auth/Register' : '/register',
  courses: production ? '/Courses' : '/courses'
}

function endpoint(name) {
  const url = production
    ? 'https://programmingcourse.herokuapp.com/api'
    : 'http://localhost:3000/api'
  return url + name
}

export const resources = {
  login: endpoint(map.login),
  verify: endpoint(map.verify),
  register: endpoint(map.register),
  courses: endpoint(map.courses)
}
