import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    maxWidth: '400px',
    paddingBottom: theme.spacing(1)
  },
  step: {
    maxWidth: 400,
    flexShrink: 0,
    padding: theme.spacing(0, 4)
  }
}))
