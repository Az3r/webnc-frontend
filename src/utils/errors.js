/**
 * @typedef {'unknown' |
 * 'auth'
 * } ErrorScope
 * @typedef {'unknown' |
 * 'invalid-email' |
 * 'weak-password' |
 * 'account-existed'
 * } ErrorType
 * @typedef {Object} ErrorCode
 * @property {ErrorScope} ErrorCode.scope
 * @property {ErrorType} ErrorCode.type
 * @property {string} ErrorCode.code ${scope}/${type}
 * @property {Error} ErrorCode.details
 * @property {unknown} ErrorCode.value
 */

/**
 * create error message
 * @param {ErrorScope} scope
 * @param {ErrorType} type
 * @param {string} value
 * @returns
 */
export function create(scope, type, value) {
  const error = new Error(`${scope}/${type}:${value}`)
  error.name = 'AppError'
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
