import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  title: {
    ...theme.typography.h4,
    textAlign: 'center',
    padding: theme.spacing(1, 0)
  },
  divider: {
    height: theme.spacing(0.5),
    margin: theme.spacing(1, 0)
  }
}))
