import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { routes } from '@/utils/app'

const SearchContext = React.createContext({
  keyword: '',
  update: () => {},
  search: () => {}
})

const SearchProvider = ({ children }) => {
  const router = useRouter()
  const [keyword, update] = React.useState('')

  const search = (q) => {
    if (q) {
      update(q)
      router.push({
        pathname: routes.search,
        query: { q }
      })
    }
  }

  return (
    <SearchContext.Provider value={{ keyword, search, update }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider

export function useSearch() {
  return React.useContext(SearchContext)
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
}
