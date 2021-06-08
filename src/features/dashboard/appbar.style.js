import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    height: 64
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {},
  title: {
    flexGrow: 1,
    fontFamily: 'Dancing Script'
  }
}))
