import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core'

const light = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light'
    }
  })
)
const dark = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark'
    }
  })
)

const AppContext = createContext({
  theme: 'light',
  setTheme: () => {}
})

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}

export { dark, light }

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}
