import { createContext } from 'react'

export default createContext({
  next: () => {},
  previous: () => {},
  form: null,
  update: () => {}
})
