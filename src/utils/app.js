export const appname = 'Urskyll'

export const routes = {
  login: '/login',
  register: '/register',
  verify: '/verify',
  search: '/search',
  category: (name) => `/${name}`,
  topic: (category, name) => `/${category}/${name}`,
  course: (id) => `/course/${id}`,
  u: {
    shop: '/u/shop',
    watchlist: '/u/watchlist',
    library: '/u/library',
    watch: (id) => `/u/watch/${id}`
  },
  l: {
    dashboard: '/l/dashboard'
  }
}

/** user must be authenticated to perform an action */
export function withAuthenticated({
  router,
  user,
  validator = (user) => Boolean(user),
  action
}) {
  if (!validator(user))
    return router.push({
      pathname: routes.login,
      query: { redirect: router.asPath }
    })
  return action?.()
}
