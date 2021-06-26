import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    ['& *']: {
      color: theme.palette.getContrastText(theme.palette.secondary.main)
    },
    ['& > div']: {
      display: 'inherit',
      alignItems: 'inherit'
    }
  }
}))
