import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const DrawerContext = React.createContext({
  open: false,
  toggle: () => {}
})

export default function DrawerHome({ children }) {
  const [open, toggle] = React.useState(false)
  return (
    <DrawerContext.Provider value={{ open, toggle }}>
      <Drawer anchor="right" open={open} onClose={() => toggle(false)}>
        <List>
          <ListItem button>
            <ListItemText>Sign up</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      {children}
    </DrawerContext.Provider>
  )
}

function useDrawer() {
  return React.useContext(DrawerContext)
}

export { useDrawer }

DrawerHome.propTypes = {
  children: PropTypes.node.isRequired
}
