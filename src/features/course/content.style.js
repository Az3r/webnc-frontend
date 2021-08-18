import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  header: {
    ...theme.typography.h5,
    fontWeight: theme.typography.h6.fontWeight
  },
  ul: {
    ['& > li']: {
      margin: theme.spacing(2, 0)
    }
  }
}))
