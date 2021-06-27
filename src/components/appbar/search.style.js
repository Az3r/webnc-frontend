import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0, 0, 0, 1),
    borderRadius: theme.shape.borderRadius * 2
  }
}))
