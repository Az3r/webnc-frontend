import {
  createGenerateClassName,
  createMuiTheme,
  responsiveFontSizes
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

export const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  disableGlobal: true
})

export { dark, light }
