import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchGET, resources } from '@/utils/api'

const AuthContext = createContext({
  error: undefined,
  user: undefined,
  loading: true,
  revalidate: () => {}
})

const AuthProvider = ({ children }) => {
  const [{ data, loading, error }, setState] = useState({
    data: undefined,
    loading: true,
    error: undefined
  })
  const [mutate, setMutate] = useState(false)

  useEffect(() => {
    fetchGET(resources.user.session)
      .then((data) => setState({ data, loading: false, error: undefined }))
      .catch((error) => setState({ data: undefined, loading: false, error }))
  }, [mutate])

  return (
    <AuthContext.Provider
      value={{
        revalidate: () => setMutate((prev) => !prev),
        user: data && {
          id: data?.id,
          avatar: data?.avatarUrl,
          username: data?.userName,
          email: data?.email
        },
        loading,
        error
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
