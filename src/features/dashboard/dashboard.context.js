import React, { useState } from 'react'
import PropTypes from 'prop-types'

const DashboardContext = React.createContext({
  loading: false,
  processing: () => {},
  drawer: true,
  toggle: () => {}
})

export default function DashboardProvider({ children }) {
  const [drawer, toggle] = useState(false)
  const [loading, processing] = useState(false)
  return (
    <DashboardContext.Provider value={{ drawer, toggle, loading, processing }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return React.useContext(DashboardContext)
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired
}
