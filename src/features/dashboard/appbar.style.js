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
  title: {
    fontFamily: 'Dancing Script'
  },
  form: {
    padding: theme.spacing(1, 0),
    marginLeft: theme.spacing(4),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  search: {
    padding: theme.spacing(0, 1),
    maxWidth: 512,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius
  }
}))
