const { createMuiTheme, responsiveFontSizes } = require('@material-ui/core')

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

export { dark, light }
