export const appname = 'Urskyll'

export const routes = {
  login: '/login',
  register: '/register',
  verify: '/verify',
  search: '/search',
  category: (name) => `/${name}`,
  topic: (category, name) => `/${category}/${name}`,
  course: (id) => `/course/${id}`,
  dashboard: '/u/',
  u: {
    explore: '/u/explore',
    course: '/u/course'
  }
}
