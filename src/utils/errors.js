/**
 * @typedef {'UnknownError' |
 * 'AuthError' |
 * 'ApiError'
 * } ErrorName
 * @typedef {'unknown' |
 * 'invalid-email' |
 * 'weak-password' |
 * 'account-existed' |
 * 'username-not-found' |
 * 'password-not-match' |
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
 * @param {string} value
 * @returns
 */
export function create(name, type, value) {
  const error = new Error(`${name}/${type}:${value}`)
  Error.captureStackTrace(error)
  error.name = name
  error.type = type
  error.code = `${name}/${type}`
  error.value = value
  return error
}

/**
 * @param {Error} error
 * @returns {ErrorCode}
 */
export function parse(error) {
  if (error?.name === 'AppError') {
    const [code, value] = error.message.split(':', 2)
    const [scope, type] = code.split('/', 2)
    return {
      code,
      value,
      scope,
      type,
      details: error
    }
  }
  return {
    code: 'unknown',
    value: undefined,
    scope: 'unknown',
    type: 'unknown',
    details: error
  }
}
