import PropTypes from 'prop-types'
import React from 'react'

const CreateCourseContext = React.createContext({
  course: {
    thumbnail: '',
    price: 0,
    discount: 0,
    title: ''
  },
  update: () => {}
})

export default function CreateCourseProvider({ children }) {
  const [course, update] = React.useState({
    thumbnail: '',
    price: 0,
    discount: 0,
    title: ''
  })
  return (
    <CreateCourseContext.Provider
      value={{
        course,
        update: (props) => update((prev) => ({ ...prev, ...props }))
      }}
    >
      {children}
    </CreateCourseContext.Provider>
  )
}

export function useCreateCourse() {
  return React.useContext(CreateCourseContext)
}

CreateCourseProvider.propTypes = {
  children: PropTypes.node.isRequired
}
