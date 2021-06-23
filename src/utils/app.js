export const appname = 'Urskyll'

export const routes = {
  login: '/login',
  register: '/register',
  verify: '/verify',
  search: (q = '') => `/search?q=${q}`,
  category: (name) => `/${name}`,
  topic: (category, name) => `/${category}/${name}`,
  course: (id) => `/course/${id}`,
  dashboard: '/u/',
  u: {
    explore: '/u/explore',
    course: '/u/course'
  }
}
