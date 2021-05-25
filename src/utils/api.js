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

const production = process.env.MOCK_API === 'disabled'
const map = {
  login: production ? '/Auth/Login' : '/login',
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
  courses: endpoint(map.courses)
}
