import { IconButton, InputBase } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import { useSearchRead, useSearchWrite } from '../search.provider'
import useStyles from './search.style'

export default function InlineSearch(props) {
  const styles = useStyles()
  const { keyword } = useSearchRead()
  const [q, setQ] = React.useState('')
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        const { search } = useSearchWrite()
        if (q) search(q)
      }}
    >
      <InputBase
        {...props}
        onFocus={(e) => e.target.select()}
        name="search"
        value={q || keyword}
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
