import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ApiError, resources } from '@/utils/api'

const AuthContext = createContext({
  error: undefined,
  user: undefined,
  loading: true,
  revalidate: () => {}
})

const AuthProvider = ({ children }) => {
  const [valid, setValid] = React.useState(false)
  const [session, setSession] = React.useState({
    user: undefined,
    error: undefined
  })
  const revalidate = () => setValid((prev) => !prev)

  useEffect(async () => {
    // invalidate current session
    setSession({ user: undefined, error: undefined })

    const url = resources.user.get(valid)
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) return setSession({ user: data.results, error: undefined })
    const error = ApiError(data.error)
    return setSession({ user: undefined, error })
  }, [valid])

  return (
    <AuthContext.Provider
      value={{
        revalidate,
        user: session.user,
        error: session.error,
        loading: !session.user && !session.error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuth() {
  return useContext(AuthContext)
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
