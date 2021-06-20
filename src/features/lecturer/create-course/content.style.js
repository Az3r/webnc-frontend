import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  header: {
    ...theme.typography.h5,
    fontWeight: theme.typography.h6.fontWeight
  },
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  empty: {
    height: '50vh',
    border: `1px dashed ${theme.palette.text.hint}`
  }
}))
