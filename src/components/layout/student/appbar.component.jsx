import React, { useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import useStyles from './appbar.style'
import { appname } from '@/utils/app'
import { useStudent } from './student.context'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { Close, Search, Menu, Shop } from '@material-ui/icons'
import {
  Hidden,
  InputBase,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Popover,
  useTheme,
  ListItemText,
  ListItem,
  useMediaQuery
} from '@material-ui/core'
import CategoryPopover from './category.popover'
import { useSearch } from '@/components/search.provider'

const AppBarContext = createContext({
  q: '',
  update: () => {},
  searching: false,
  toggleSearch: () => {}
})
const AnimatedIconButton = animated(IconButton)

export default function StudentAppBar() {
  const styles = useStyles()
  const { keyword } = useSearch()
  const [q, update] = useState(keyword)
  const [searching, toggleSearch] = useState(false)

  return (
    <AppBarContext.Provider value={{ q, update, searching, toggleSearch }}>
      <AppBar
        position="fixed"
        color="inherit"
        classes={{ root: styles.appbar }}
      >
        <Toolbar>{searching ? <SearchAppBar /> : <DefaultAppBar />}</Toolbar>
      </AppBar>
    </AppBarContext.Provider>
  )
}

function SearchForm() {
  const { search } = useSearch()
  const { q, update, searching } = useContext(AppBarContext)
  const styles = useStyles()
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        search(q)
      }}
    >
      <InputBase
        autoFocus={searching}
        onFocus={(e) => e.target.select()}
        className={styles.search}
        name="search"
        fullWidth
        value={q}
        onChange={(e) => update(e.target.value)}
        placeholder="Search anything"
        endAdornment={
          <IconButton type="submit" color="inherit">
            <Search />
          </IconButton>
        }
      />
    </form>
  )
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func
}

function DefaultAppBar() {
  const styles = useStyles()
  const theme = useTheme()
  const { drawer, toggle } = useStudent()
  const { toggleSearch } = useContext(AppBarContext)
  const spring = useSpring({ rotate: drawer ? 360 : 0 })
  const [popup, show] = useState(false)
  const up470 = useMediaQuery('(min-width: 470px)')

  return (
    <>
      <AnimatedIconButton
        edge="start"
        style={spring}
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          console.log(drawer)
          return toggle((prev) => !prev)
        }}
      >
        {drawer ? <Close /> : <Menu />}
      </AnimatedIconButton>
      <Hidden smDown implementation="css">
        <Typography className={styles.title} variant="h5">
          {appname}
        </Typography>
      </Hidden>
      <ListItem
        aria-owns={popup ? 'popover-category' : undefined}
        aria-haspopup="true"
        classes={{ root: styles.listitem }}
        button
        selected={popup}
        onClick={() => show(true)}
      >
        <ListItemText primary="Categories" />
      </ListItem>
      {up470 ? (
        <SearchForm />
      ) : (
        <>
          <Box flexGrow={1} />{' '}
          <IconButton onClick={() => toggleSearch(true)}>
            <Search />
          </IconButton>
        </>
      )}
      <Box paddingLeft={1} display="flex">
        <IconButton>
          <Shop />
        </IconButton>
      </Box>
      <Popover
        id="popover-category"
        disableRestoreFocus
        elevation={4}
        anchorReference="anchorPosition"
        anchorPosition={{
          left: 0,
          top: theme.mixins.toolbar.minHeight + theme.spacing(1)
        }}
        open={popup}
        onClose={() => show(false)}
      >
        <CategoryPopover />
      </Popover>
    </>
  )
}

function SearchAppBar() {
  const { toggleSearch } = useContext(AppBarContext)
  return (
    <>
      <IconButton onClick={() => toggleSearch(false)}>
        <Close />
      </IconButton>
      <SearchForm />
    </>
  )
}
