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

function endpoint(name) {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'https://programmingcourse.herokuapp.com/api'
      : 'http://localhost:3000/api'
  return url + name
}

export const resources =
  process.env.NODE_ENV === 'production'
    ? {
        login: endpoint('/Auth/Login'),
        courses: endpoint('/Courses')
      }
    : {
        login: endpoint('/login'),
        courses: endpoint('/courses')
      }
