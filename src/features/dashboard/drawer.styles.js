import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  drawer: { flexShrink: 0 },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.mixins.toolbar.padding
  },
  number: {
    padding: theme.spacing(0.4)
  }
}))
