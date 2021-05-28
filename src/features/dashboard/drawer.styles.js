import { fade, makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    width: 280,
    backgroundColor: theme.palette.background.paper
  },
  number: {
    color: theme.palette.grey['500'],
    padding: theme.spacing(0.4)
  }
}))
