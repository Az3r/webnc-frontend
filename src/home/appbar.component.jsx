import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  TextField,
  Menu,
  Toolbar,
  Typography,
  Badge
} from '@material-ui/core'
import { Search, Shop } from '@material-ui/icons'
import React from 'react'
import useStyles from './appbar.style'

function AppBarHome(props, ref) {
  const styles = useStyles()
  return (
    <AppBar position="fixed" ref={ref} {...props}>
      <Toolbar>
        <Typography variant="h4" style={{ fontFamily: 'Dancing Script' }}>
          Urskyll
        </Typography>
        <CategoryMenu />
        <Box flexGrow={1}>
          <Box display="flex" maxWidth="800px" margin="auto">
            <InputBase
              className={styles.search}
              fullWidth
              placeholder="Search your courses..."
              endAdornment={
                <IconButton color="inherit">
                  <Search />
                </IconButton>
              }
            />
          </Box>
        </Box>
        <IconButton color="inherit" max={99}>
          <Badge color="error" badgeContent={1}>
            <Shop />
          </Badge>
        </IconButton>
        <Button color="inherit" style={{ width: '120px' }}>
          Sign up
        </Button>
        <Button color="inherit" style={{ width: '120px' }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}

function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const close = () => {
    setAnchorEl(null)
  }

  return (
    <Box paddingLeft={4} paddingRight={4}>
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
  )
}

export default React.forwardRef(AppBarHome)
