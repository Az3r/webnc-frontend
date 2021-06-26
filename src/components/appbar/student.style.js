import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  title: {
    fontFamily: 'Dancing Script'
  },
  brand: {
    ['& > *']: {
      margin: theme.spacing(0, 1)
    }
  },
  form: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0, 0, 0, 1),
    borderRadius: theme.shape.borderRadius * 2
  },
  drawer: {
    width: '100%',
    maxWidth: 320
  },
  avatar: {
    borderRadius: '50%'
  },
  actions: {
    ['& > *']: {
      margin: theme.spacing(0, 0.5)
    }
  }
}))
