import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const DashboardContext = React.createContext({
  loading: false,
  processing: () => {},
  drawer: true,
  toggle: () => {},
  section: '',
  go: () => {},
  keyword: '',
  search: () => {}
})

export default function DashboardProvider({ children }) {
  const router = useRouter()
  const [keyword, search] = useState('')
  const [drawer, toggle] = useState(false)
  const [loading, processing] = useState(false)
  const [section, go] = useState(sections.home)

  useEffect(() => {
    const path = document.URL.split('#', 2)
    if (path && path[1])
      Object.keys(sections).forEach((key) => {
        const value = sections[key]
        if (value === `#${path[1]}`) go(value)
      })
  }, [])

  useEffect(() => {
    router.push(router.pathname, `${router.pathname}${section}`, {
      shallow: true
    })
  }, [section])

  return (
    <DashboardContext.Provider
      value={{
        drawer,
        toggle,
        loading,
        processing,
        section,
        go,
        keyword,
        search: (keyword) => {
          go(sections.search)
          search(keyword)
        }
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return React.useContext(DashboardContext)
}

export const sections = {
  home: '',
  search: '#search',
  courses: '#courses',
  favorites: '#favorites',
  cart: '#cart'
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired
}
