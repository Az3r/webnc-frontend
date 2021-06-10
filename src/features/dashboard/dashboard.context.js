import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const DashboardContext = React.createContext({
  loading: false,
  processing: () => {},
  drawer: true,
  toggle: () => {},
  section: '',
  go: () => {}
})

export default function DashboardProvider({ children }) {
  const router = useRouter()
  const [drawer, toggle] = useState(false)
  const [loading, processing] = useState(false)
  const [section, go] = useState(sections.home)

  useEffect(() => {
    router.push(router.pathname, `${router.pathname}${section}`, {
      shallow: true
    })
  }, [section])

  return (
    <DashboardContext.Provider
      value={{ drawer, toggle, loading, processing, section, go }}
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
  search: '#search'
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired
}
