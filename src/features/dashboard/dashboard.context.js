import React, { useState } from 'react'

const DashboardContext = React.createContext({
  drawer: true,
  toggle: () => {}
})

export default function DashboardProvider({ children }) {
  const [drawer, toggle] = useState(true)
  return (
    <DashboardContext.Provider value={{ drawer, toggle }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return React.useContext(DashboardContext)
}
