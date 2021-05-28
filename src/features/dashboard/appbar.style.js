import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  appbar: {
    zIndex: 1000,
    boxShadow: 'none',
    height: 64
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    fontFamily: 'Dancing Script'
  }
}))
