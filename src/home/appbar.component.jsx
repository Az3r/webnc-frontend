import PropTypes from 'prop-types'

import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Toolbar,
  Typography,
  Badge,
  useScrollTrigger,
  Slide,
  Zoom,
  Fab,
  Hidden,
  useMediaQuery
} from '@material-ui/core'
import { Close, Search, Shop } from '@material-ui/icons'
import React, { useContext } from 'react'
import { Menu as MenuIcon } from '@material-ui/icons'
import useStyles from './appbar.style'
import { useDrawer } from '@/home/drawer.component'

const AppBarContext = React.createContext({
  search: () => {},
  focus: () => {},
  inputEl: null,
  keywords: ''
})

function AppBarHome(props, ref) {
  const trigger = useScrollTrigger({
    threshold: 480,
    disableHysteresis: true
  })

  const min450 = useMediaQuery('(min-width: 450px)')
  const [searching, toggleSearchAppBar] = React.useState(false)

  const inputEl = React.useRef(null)
  const keywords = React.useRef('')

  function focus() {
    toggleSearchAppBar(true)
    inputEl.current?.focus()
    inputEl.current?.select()
  }

  function search(e) {
    // update ui
    e.preventDefault()
    inputEl.current?.blur()
    toggleSearchAppBar(false)

    // handle submitted search keywords
    console.log('search with keywords: ' + keywords.value)
  }

  return (
    <AppBarContext.Provider value={{ search, focus, inputEl, keywords }}>
      <Zoom in={trigger}>
        <Box position="fixed" bottom="0" right="0" margin={2}>
          <Fab onClick={focus} color="primary">
            <Search />
          </Fab>
        </Box>
      </Zoom>
      <Slide in={trigger}>
        <AppBar position="fixed" ref={ref} {...props}>
          <Toolbar>
            {!min450 && searching ? (
              <IconButton
                onClick={() => toggleSearchAppBar(false)}
                color="inherit"
              >
                <Close />
              </IconButton>
            ) : (
              <>
                <Typography
                  variant="h4"
                  style={{ fontFamily: 'Dancing Script' }}
                >
                  Urskyll
                </Typography>
                <CategoryMenu />
              </>
            )}
            <Box flexGrow={1} paddingLeft={searching && !min450 ? 0 : 4}>
              {(min450 || searching) && <SearchField autoFocus={searching} />}
            </Box>
            {(min450 || !searching) && (
              <>
                <Actions />
                <MoreActionMenu />
              </>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </AppBarContext.Provider>
  )
}

function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const up750 = useMediaQuery('(min-width: 750px)')

  const open = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const close = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {up750 && (
        <Box paddingLeft={4}>
          <Typography variant="h6" style={{ cursor: 'pointer' }} onClick={open}>
            Categories
          </Typography>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={undefined}
            open={Boolean(anchorEl)}
            onClose={close}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={close}>
              <img
                src="images/category_web.webp"
                width="24px"
                height="24px"
                style={{ borderRadius: '50%' }}
              />
              <Box paddingLeft={1}>
                <Typography>Web development</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={close}>
              <img
                src="images/category_mobile.webp"
                width="24px"
                height="24px"
                style={{ borderRadius: '50%' }}
              />
              <Box paddingLeft={1}>
                <Typography>Mobile development</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  )
}

const SearchField = React.memo(
  ({ autoFocus }) => {
    const styles = useStyles()
    const { search, inputEl, keywords } = useContext(AppBarContext)
    const [s, update] = React.useState(keywords.current)

    React.useEffect(() => {
      keywords.current = s
    }, [s])

    return (
      <form onSubmit={search}>
        <InputBase
          autoFocus={autoFocus}
          name="keywords"
          value={s}
          onChange={(e) => update(e.target.value)}
          inputRef={inputEl}
          className={styles.search}
          fullWidth
          placeholder="Search your courses..."
          endAdornment={
            <IconButton type="submit" color="inherit">
              <Search />
            </IconButton>
          }
        />
      </form>
    )
  },
  () => true
)

SearchField.propTypes = {
  autoFocus: PropTypes.bool
}

SearchField.defaultProps = {
  autoFocus: false
}

function MoreActionMenu() {
  const { toggle } = useDrawer()
  return (
    <Box display="flex">
      <Hidden smDown>
        <Button color="inherit" style={{ width: '100px' }}>
          Sign up
        </Button>
        <Button color="inherit" style={{ width: '100px' }}>
          Login
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton color="inherit" onClick={() => toggle(true)}>
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Box>
  )
}

function Actions() {
  return (
    <Box display="flex" paddingLeft={2}>
      <IconButton color="inherit">
        <Badge color="error" badgeContent={1} max={99}>
          <Shop />
        </Badge>
      </IconButton>
    </Box>
  )
}

export default React.forwardRef(AppBarHome)
