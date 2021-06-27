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
  drawer: {
    width: '100%',
    maxWidth: 320
  },
  category: {
    ...theme.mixins.toolbar,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  popover: {
    zIndex: 10000,
    position: 'absolute',
    top: (theme.mixins.toolbar.minHeight / 3) * 2 + theme.spacing(1),
    left: theme.spacing(20)
  }
}))
