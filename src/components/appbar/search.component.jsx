import { routes } from '@/utils/app'
import { IconButton, InputBase } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useStyles from './search.style'

export default function InlineSearch(props) {
  const styles = useStyles()
  const router = useRouter()
  const [q, setQ] = React.useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQ(params.get('q') || '')
  }, [])

  function search(e) {
    e.preventDefault()
    if (q)
      router.push({
        pathname: routes.search,
        query: { q }
      })
  }

  return (
    <form className={styles.form} onSubmit={search}>
      <InputBase
        {...props}
        onFocus={(e) => e.target.select()}
        name="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        fullWidth
        placeholder="Search anything"
        endAdornment={
          <IconButton type="submit" color="inherit">
            <Search color="inherit" />
          </IconButton>
        }
      />
    </form>
  )
}
