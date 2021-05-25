export const name = 'Urskyll'

export const api = {
  index: endpoint('/'),
  login: endpoint('/login')
}

export const routes = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard'
}

function endpoint(name) {
  return 'http://localhost:3000/api' + name
}
