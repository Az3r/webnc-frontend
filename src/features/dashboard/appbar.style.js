import { fade, makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    height: 64
  },
  title: {
    fontFamily: 'Dancing Script',
    margin: theme.spacing(0, 2)
  },
  form: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 0),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  search: {
    padding: theme.spacing(0, 1),
    maxWidth: 512,
    backgroundColor: fade(theme.palette.text.primary, 0.1),
    borderRadius: theme.shape.borderRadius
  }
}))
