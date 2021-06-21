import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { routes } from '@/utils/app'

const SearchContext = React.createContext({
  keyword: '',
  search: () => {}
})

export default function SearchProvider({ children = <></> }) {
  const router = useRouter()
  const [keyword, update] = React.useState('')

  function search(q) {
    if (q) {
      update(q)
      router.push({
        pathname: routes.search,
        query: { q }
      })
    }
  }

  return (
    <SearchContext.Provider value={{ keyword, search }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return React.useContext(SearchContext)
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
}
