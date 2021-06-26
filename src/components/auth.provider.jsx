import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { resources } from '@/utils/api'
import { create } from '@/utils/errors'

const AuthContext = createContext({
  error: undefined,
  user: undefined
})
let update

export default function AuthProvider({ children }) {
  const [identity, setIdentity] = React.useState(null)
  const [session, setSession] = React.useState({
    user: undefined,
    error: undefined
  })
  update = (id) => setIdentity(id)

  useEffect(async () => {
    if (identity == null || identity == undefined)
      return { user: undefined, error: undefined }

    const url = resources.user.get(identity)
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) return setSession({ user: data.results, error: undefined })
    const error = create('auth', 'unknown', url)
    error.code = 'auth/unknown'
    error.error = data.error
    error.value = url
    return setSession({ user: undefined, error })
  }, [identity])

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        error: session.error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthRead() {
  return useContext(AuthContext)
}
export function useAuthWrite() {
  return { update }
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
