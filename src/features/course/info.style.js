import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  favorite: {
    color: '#e040fb'
  },
  red: {
    color: theme.palette.error.main
  },
  strikethrough: {
    textDecoration: 'line-through'
  }
}))
