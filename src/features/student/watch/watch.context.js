import { CourseDetailPropTypes } from '@/utils/typing'
import PropTypes from 'prop-types'
import React, { createContext, useContext } from 'react'

const WatchContext = createContext({
  course: {}
})

export default function WatchProvider({ course, children }) {
  return (
    <WatchContext.Provider value={{ course }}>{children}</WatchContext.Provider>
  )
}

export function useWatch() {
  return useContext(WatchContext)
}

WatchProvider.propTypes = {
  course: CourseDetailPropTypes.isRequired,
  children: PropTypes.node
}
