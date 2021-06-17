import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0)
  },
  textfield: theme.typography.h5,
  favorite: {
    color: '#e040fb'
  },
  red: {
    color: theme.palette.error.main
  },
  strikethrough: {
    textDecoration: 'line-through'
  },
  edit: {
    color: theme.palette.info.main
  }
}))
