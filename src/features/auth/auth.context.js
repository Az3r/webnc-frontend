import { createContext } from 'react'

export default createContext({
  next: () => {},
  previous: () => {},
  form: { username: '', password: '', email: '' },
  update: () => {},
  redirect: ''
})
