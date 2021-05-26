import React from 'react'

const DrawerContext = React.createContext({
  open: false,
  toggle: () => {}
})

function useDrawer() {
  return React.useContext(DrawerContext)
}

export default DrawerContext
export { useDrawer }
