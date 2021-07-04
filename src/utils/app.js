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
    watch: '/u/watch'
  }
}
