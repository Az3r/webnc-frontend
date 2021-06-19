import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    ...theme.typography.h5,
    fontWeight: theme.typography.h6.fontWeight
  },
  placeholder: {
    ['&::placeholder']: {
      fontStyle: 'italic'
    }
  },
  form_duration: {
    alignItems: 'center'
  },
  input_duration: {
    width: 48
  },
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }
}))
