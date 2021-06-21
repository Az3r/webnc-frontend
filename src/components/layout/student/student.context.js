import React, { useState } from 'react'
import PropTypes from 'prop-types'

const StudentContext = React.createContext({
  loading: false,
  processing: () => {},
  drawer: true,
  toggle: () => {}
})

export default function LayoutProvider({ children }) {
  const [drawer, toggle] = useState(false)
  const [loading, processing] = useState(false)

  return (
    <StudentContext.Provider
      value={{
        drawer,
        toggle,
        loading,
        processing
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  return React.useContext(StudentContext)
}

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired
}
