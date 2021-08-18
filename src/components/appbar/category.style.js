import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    ['& *']: {
      color: theme.palette.text.primary
    }
  },
  avatar: {
    borderRadius: '50%'
  }
}))
