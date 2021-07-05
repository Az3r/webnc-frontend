import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { resources, useGET } from '@/utils/api'

const AuthContext = createContext({
  error: undefined,
  user: undefined,
  loading: true,
  revalidate: () => {}
})

const AuthProvider = ({ children }) => {
  const { data, loading, error, mutate } = useGET(resources.user.session)
  const revalidate = () => mutate(resources.user.session)

  return (
    <AuthContext.Provider
      value={{
        revalidate,
        user: data,
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
