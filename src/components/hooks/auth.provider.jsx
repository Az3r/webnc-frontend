import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ApiError, resources } from '@/utils/api'
import { useRouter } from 'next/router'
import { routes } from '@/utils/app'

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
    fetchUserSession()
      .then((data) => setState({ data, loading: false, error: undefined }))
      .catch((error) => setState({ data: undefined, loading: false, error }))
  }, [mutate])

  return (
    <AuthContext.Provider
      value={{
        revalidate: () => setMutate((prev) => !prev),
        user: data && {
          id: data.id,
          avatar: data.avatarUrl,
          username: data.userName,
          email: data.email,
          role: data.role
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

/** redirect to given destination if an user doesn't meet condition */
export function useAuth(validate, redirect = routes.login) {
  const router = useRouter()
  const { loading, user, ...props } = useContext(AuthContext)
  useEffect(() => {
    if (!loading && validate) {
      if (!validate(user))
        router.replace({
          pathname: redirect,
          query: { redirect: router.asPath }
        })
    }
  }, [user, loading])
  return { user, loading, ...props }
}

async function fetchUserSession() {
  const response = await fetch(resources.user.session, {
    credentials: 'include'
  })
  const data = await response.json()
  if (response.ok) return { ...data.results, role: data.role.value }
  throw ApiError(data.errors)
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
