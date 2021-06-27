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
      type: 'light',
      primary: {
        main: '#0277bd'
      },
      secondary: {
        main: '#673ab7'
      }
    }
  })
)
const dark = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#333'
      },
      secondary: {
        main: '#333'
      },
      background: {
        paper: '#2a2a2a'
      }
    }
  })
)

const AppContext = createContext({
  theme: 'light',
  setTheme: () => {}
})

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark')
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
