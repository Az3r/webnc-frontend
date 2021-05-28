import React from 'react'

const DashboardContext = React.createContext({})

export default function DashboardProvider({ children }) {
  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  )
}

export function useDashboard() {
  return React.useContext(DashboardContext)
}
